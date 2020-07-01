import { ActionParam } from "@/typing/state";
import { Notification } from "@/typing/notification";
import * as api from "@/plugins/api";

import { mutations, actions } from "./types";
import { LoginPayload, ForgotPasswordPayload, RegisterPayload, ResetPayload, CreateDocumentPayload } from "@/typing/state/actions";
import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { userMapper, prepurchaseMapper, purchaseMapper } from "@/utils/mappers";
import { Pagination } from "@/typing/paginations";
import { Filters } from "@/typing/search";
import { PurchasePrepaymentPayload } from "@/typing/purchase";

const notification = ({ commit }: ActionParam, notification: Notification | null) => {
  commit(mutations.NOTIFICATION, notification);
};

const contact = async ({ commit, dispatch }: ActionParam, {
  email,
  subject,
  message
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  console.log("Sending contact message");
  try {
    await api.contactUs(email, subject, message);
    dispatch(actions.NOTIFICATION, { message: "Thank you for your message", type: "success" });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, { message: "Unable to send message.", type: "error" });
  }
};

const login = async ({ commit, dispatch }: ActionParam, { email, password }: LoginPayload) => {
  try {
    const { data } = await api.login(email, password);

    const { user, token }: { user?: User; token?: string } = data;

    if (!user || !token) {
      throw new Error("User or token missing");
    }

    api.setToken(token);
    commit(mutations.LOGIN, { user: userMapper.fromBackend(user), token });
    return user;
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Incorrect username or password",
      type: "error"
    });
  }

  return null;
};

const forgotPassword = async ({ dispatch }: ActionParam, { email }: ForgotPasswordPayload) => {
  try {
    await api.forgotPassword(email);

    dispatch(actions.NOTIFICATION, {
      message: "Email with password restore link sent to your email",
      type: "success"
    });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to send reset password instructions to desired email.",
      type: "error"
    });
  }
};

const register = async ({ dispatch }: ActionParam, { email, password, confirmation }: RegisterPayload) => {
  try {
    await api.register(email, password, confirmation);

    dispatch(actions.NOTIFICATION, {
      message: "Your account created successfully. Please check your email for confirmation letter.",
      type: "success"
    });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to create account with such email or password.",
      type: "error"
    });
  }
};

const resetPassword = async ({ dispatch }: ActionParam, { token, password, confirmation }: ResetPayload) => {
  try {
    await api.resetPassword(token, password, confirmation);

    dispatch(actions.NOTIFICATION, {
      message: "New password was set. Please login now",
      type: "success"
    }
    );
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to set new password.",
      type: "error"
    });
  }
};

const loadDocuments = async ({ dispatch, commit }: ActionParam, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const { data } = await api.loadDocuments(pagination);
    commit(mutations.DOCUMENTS, { documents: data.data });

    return data;
  } catch (error) {
    console.error(">> err", error);
    commit(mutations.DOCUMENTS, { documents: [] });
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load documents.",
      type: "error"
    });
  }
};

const searchDocuments = async ({ dispatch, commit }: ActionParam, filters: Filters, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const { data } = await api.searchDocuments(filters, pagination);
    commit(mutations.DOCUMENTS, { documents: data.data });

    return data;
  } catch (error) {
    console.error(">> err", error);
    commit(mutations.DOCUMENTS, { documents: [] });
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load documents.",
      type: "error"
    });
  }
};

const loadPopularDocuments = async ({ commit, dispatch }: ActionParam) => {
  try {
    const { data } = await api.getPopularDocuments();
    commit(mutations.POPULAR_DOCUMENTS, { documents: data.data });
  } catch (error) {
    console.error(">> err", error);
    commit(mutations.POPULAR_DOCUMENTS, { documents: [] });
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load most popular documents.",
      type: "error"
    });
  }
};

const loadDocument = async ({ commit, dispatch }: ActionParam, documentId: string) => {
  try {
    const { data } = await api.loadDocument(documentId);
    commit(mutations.CURRENT_DOCUMENT, { document: data.document });

    return data.document;
  } catch (error) {
    commit(mutations.CURRENT_DOCUMENT, { document: null });
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load document.",
      type: "error"
    });
  }

  return null;
};

const prepurchaseDocument = async ({ commit }: ActionParam, payload: PurchasePrepaymentPayload) => {
  const { data } = await api.prepurchaseDocument(prepurchaseMapper.toBackend(payload));
  commit(mutations.STRIPE_PUB_KEY, { key: data.stripe_publishable_key });
  return { clientSecret: data.client_secret };
};

const checkPurchaseDocument = async (_param: ActionParam, paymentId: string) => {
  const { data: { purchase } } = await api.checkPurchaseDocument(paymentId);
  return { purchase: purchaseMapper.fromBackend(purchase) };
};

const getUserDocuments = async (_param: ActionParam) => {
  const { data } = await api.getUserDocuments();
  return data.data;
};

// Admin //

const adminCreateDocument = async ({ state, dispatch, commit }: ActionParam, payload: CreateDocumentPayload) => {
  try {
    const document = await api.adminCreateDocument(
      payload.title,
      payload.organization || "",
      payload.department || "",
      payload.description || "",
      payload.file
    );

    commit(mutations.DOCUMENTS, { documents: [...state.documents, document] });

    dispatch(actions.NOTIFICATION, {
      message: "Document successfully created",
      type: "success"
    });

    return document;
  } catch (error) {
    console.error(">> err");
    dispatch(actions.NOTIFICATION, {
      message: "Unable to create document",
      type: "error"
    });
  }
};

const adminDeleteDocument = async ({ state, dispatch, commit }: ActionParam, document: Document) => {
  try {
    await api.adminDeleteDocument(document.id);
    const documents = state.documents.filter(doc => doc.id !== document.id);

    commit(mutations.DOCUMENTS, { documents });

    dispatch(actions.NOTIFICATION, {
      message: "Document deleted.",
      type: "success"
    });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to delete documents.",
      type: "error"
    });
  }
};

const adminUpdateDocument = async ({ dispatch }: ActionParam, { document }: { document: Document }) => {
  try {
    await api.adminUpdateDocument(document);

    dispatch(actions.NOTIFICATION, {
      message: "Document updated.",
      type: "success"
    });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to update documents.",
      type: "error"
    });
  }
};

const adminLoadUsers = async ({ dispatch, commit }: ActionParam, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const { data } = await api.loadUsers(pagination);
    commit(mutations.USERS, { users: data.data.map(userMapper.fromBackend) });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load users.",
      type: "error"
    });
  }
};

const adminUpdateUser = async ({ dispatch, state, commit }: ActionParam, { user }: { user: User }) => {
  try {
    const { data: { user: updatedUser } } = await api.adminUpdateUser(userMapper.toBackend(user));

    const users = [ ...state.users ];
    const index = users.findIndex(u => u.id === updatedUser.id);

    if (index !== -1) {
      users.splice(index, 1, userMapper.fromBackend(updatedUser));
    }

    console.log("New users:", JSON.stringify(users));

    commit(mutations.USERS, { users });

    dispatch(actions.NOTIFICATION, {
      message: "User updated.",
      type: "success"
    });

    return updatedUser;
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to update user.",
      type: "error"
    });
  }
};

const adminDeleteUser = async ({ state, dispatch, commit }: ActionParam, user: User) => {
  try {
    await api.adminDeleteUser(user.id);
    const users = state.users.filter(u => u.id !== user.id);

    commit(mutations.USERS, { users });

    dispatch(actions.NOTIFICATION, {
      message: "User deleted.",
      type: "success"
    });
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to delete user.",
      type: "error"
    });
  }
};

const adminLoadPurchases = async ({ dispatch, commit }: ActionParam, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const data = await api.loadPurchases(pagination);
    commit(mutations.PURCHASES, data);
  } catch (error) {
    console.error(">> err", error);
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load purchases.",
      type: "error"
    });
  }
};

export default {
  [actions.NOTIFICATION]: notification,
  [actions.CONTACT]: contact,
  [actions.LOGIN]: login,
  [actions.FORGOT_PASSWORD]: forgotPassword,
  [actions.REGISTER]: register,
  [actions.RESET_PASSWORD]: resetPassword,
  [actions.LOAD_DOCUMENTS]: loadDocuments,
  [actions.SEARCH_DOCUMENTS]: searchDocuments,
  [actions.DOCUMENTS_LOAD_POPULAR]: loadPopularDocuments,
  [actions.LOAD_DOCUMENT]: loadDocument,

  [actions.ADMIN_LOAD_USERS]: adminLoadUsers,
  [actions.ADMIN_UPDATE_USER]: adminUpdateUser,
  [actions.ADMIN_DELETE_USER]: adminDeleteUser,
  [actions.ADMIN_LOAD_PURCHASES]: adminLoadPurchases,
  [actions.ADMIN_CREATE_DOCUMENT]: adminCreateDocument,
  [actions.ADMIN_DELETE_DOCUMENT]: adminDeleteDocument,
  [actions.ADMIN_UPDATE_DOCUMENT]: adminUpdateDocument,

  [actions.PRE_PURCHASE_DOCUMENT]: prepurchaseDocument,
  [actions.CHECK_PURCHASE_DOCUMENT]: checkPurchaseDocument,

  [actions.GET_USER_DOCUMENTS]: getUserDocuments
};

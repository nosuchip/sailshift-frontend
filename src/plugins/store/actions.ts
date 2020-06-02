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

const contact = async ({ commit }: ActionParam, {
  email,
  subject,
  message
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await api.contactUs(email, subject, message);
    commit(mutations.NOTIFICATION, { message: "Thank you for your message", type: "success" });
  } catch (error) {
    commit(mutations.NOTIFICATION, { message: "Unable to send message", type: "error" });
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
  } catch (error) {
    commit(mutations.CURRENT_DOCUMENT, { document: null });
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load most requested document.",
      type: "error"
    });
  }
};

const prepurchaseDocument = async ({ dispatch }: ActionParam, payload: PurchasePrepaymentPayload) => {
  const { data } = await api.prepurchaseDocument(prepurchaseMapper.toBackend(payload));
  return { clientSecret: data.client_secret };
};

const checkPurchaseDocument = async ({ dispatch }: ActionParam, paymentId: string) => {
  const { data: { purchase } } = await api.checkPurchaseDocument(paymentId);
  return { purchase: purchaseMapper.fromBackend(purchase) };
};

const getUserDocuments = async ({ dispatch }: ActionParam) => {
  const { data } = await api.getUserDocuments();
  return data.data;
};

// Admin //

const adminCreateDocument = async ({ state, dispatch, commit }: ActionParam, payload: CreateDocumentPayload) => {
  try {
    const document = await api.adminCreateDocument(
      payload.title,
      payload.organization,
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
    dispatch(actions.NOTIFICATION, {
      message: "Unable to create document",
      type: "error"
    });
  }
};

const adminDeleteDocument = async ({ state, dispatch, commit }: ActionParam, { document }: { document: Document }) => {
  try {
    await api.adminDeleteDocument(document.id);

    const documents = state.documents.filter(doc => doc.id !== document.id);

    commit(mutations.DOCUMENTS, { documents });

    dispatch(actions.NOTIFICATION, {
      message: "Document deleted.",
      type: "success"
    });
  } catch (error) {
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
      message: "Document deleted.",
      type: "success"
    });
  } catch (error) {
    dispatch(actions.NOTIFICATION, {
      message: "Unable to delete documents.",
      type: "error"
    });
  }
};

const adminLoadUsers = async ({ dispatch, commit }: ActionParam, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const data = await api.loadUsers(pagination);
    commit(mutations.USERS, data);
  } catch (error) {
    dispatch(actions.NOTIFICATION, {
      message: "Unable to send reset password instructions to desired email.",
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
    dispatch(actions.NOTIFICATION, {
      message: "Unable to send reset password instructions to desired email.",
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
  [actions.ADMIN_LOAD_PURCHASES]: adminLoadPurchases,
  [actions.ADMIN_CREATE_DOCUMENT]: adminCreateDocument,
  [actions.ADMIN_DELETE_DOCUMENT]: adminDeleteDocument,
  [actions.ADMIN_UPDATE_DOCUMENT]: adminUpdateDocument,

  [actions.PRE_PURCHASE_DOCUMENT]: prepurchaseDocument,
  [actions.CHECK_PURCHASE_DOCUMENT]: checkPurchaseDocument,

  [actions.GET_USER_DOCUMENTS]: getUserDocuments
};

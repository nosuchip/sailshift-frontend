import { ActionParam } from "@/typing/state";
import { Notification } from "@/typing/notification";
import * as api from "@/plugins/api";

import { mutations, actions } from "./types";
import { LoginPayload, ForgotPasswordPayload, RegisterPayload, ResetPayload, CreateDocumentPayload } from "@/typing/state/actions";
import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { userMapper } from "@/utils/mappers";
import { Pagination } from "@/typing/paginations";

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

const adminLoadDocuments = async ({ dispatch, commit }: ActionParam, pagination?: Pagination) => {
  pagination = pagination || { page: 0 };

  try {
    const { data } = await api.loadDocuments(pagination);
    commit(mutations.DOCUMENTS, {
      pagination: data.pagination || pagination,
      data: data.documents
    });
  } catch (error) {
    dispatch(actions.NOTIFICATION, {
      message: "Unable to load documents.",
      type: "error"
    });
  }
};

const adminCreateDocument = async ({ state, dispatch, commit }: ActionParam, payload: CreateDocumentPayload) => {
  try {
    const document = await api.adminCreateDocument(
      payload.title,
      payload.organization,
      payload.description || "",
      payload.file
    );

    const documents = [ ...state.documents.data, document ];
    commit(mutations.DOCUMENTS, {
      pagination: state.documents.pagination,
      data: documents
    });

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
    await api.adminDeleteDocument(document);

    const documents = state.documents.data.filter(doc => doc.id !== document.id);

    commit(mutations.DOCUMENTS, {
      pagination: state.documents.pagination,
      data: documents
    });

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
  [actions.ADMIN_LOAD_DOCUMENTS]: adminLoadDocuments,
  [actions.ADMIN_LOAD_USERS]: adminLoadUsers,
  [actions.ADMIN_LOAD_PURCHASES]: adminLoadPurchases,
  [actions.ADMIN_CREATE_DOCUMENT]: adminCreateDocument,
  [actions.ADMIN_DELETE_DOCUMENT]: adminDeleteDocument
};

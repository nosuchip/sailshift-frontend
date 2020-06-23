import axios, { AxiosResponse } from "axios";
import { Pagination, PaginatedApiResult } from "@/typing/paginations";
import { User, UserDocuments } from "@/typing/user";
import { Document } from "@/typing/document";
import { Purchase } from "@/typing/purchase";
import { Dictionary } from "@/typing/generics";
import { Filters } from "@/typing/search";

const DEFAULT_DOCUMENT_EXPIRATION_TIME_SEC = 10 * 60;

export const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || ""
});

export const resetToken = () => {
  delete instance.defaults.headers.common.Authorization;
};

export const setToken = (token?: string | null) => {
  if (!token) {
    return resetToken();
  }

  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = (email: string, password: string) => {
  return instance.post("/api/accounts/login", { email, password });
};

export const contactUs = (email: string, subject: string, message: string) => {
  return instance.post("/api/accounts/contact", { email, subject, message });
};

export const forgotPassword = (email: string) => {
  return instance.post("/api/accounts/forgot_password", { email });
};

export const register = (
  email: string,
  password: string,
  confirmation: string
) => {
  return instance.post("/api/accounts/register", {
    email,
    password,
    confirmation
  });
};

export const resetPassword = async (
  token: string,
  password: string,
  confirmation: string
) => {
  return instance.post("/api/accounts/reset_password", {
    token,
    password,
    confirmation
  });
};

type ApiResponse<T> = AxiosResponse<PaginatedApiResult<T>>;

export const loadDocuments = async (pagination: Pagination): Promise<ApiResponse<Document>> => {
  return instance.get("/api/documents/", { params: pagination });
};

export const getDocument = async (documentId: Document): Promise<Document> => {
  return instance.get(`/api/documents/${documentId}`);
};

export const getUserDocuments = async (): Promise<AxiosResponse<{ data: UserDocuments }>> => {
  return instance.get("/api/documents/my");
};

export const getPastDocument = async (): Promise<ApiResponse<Document>> => {
  return instance.get("/api/documents/admin/rerender");
};

export const searchDocuments = async (filters: Filters, pagination: Pagination): Promise<ApiResponse<Document>> => {
  return instance.post("/api/documents/search", { ...pagination, ...filters });
};

export const loadUsers = async (pagination: Pagination): Promise<ApiResponse<User>> => {
  return instance.get("/api/accounts/users", { params: pagination });
};

export const loadPurchases = async (pagination: Pagination): Promise<ApiResponse<Purchase>> => {
  return instance.get("/api/purchases/", { params: pagination });
};

export const getPopularDocuments = async () => {
  return instance.get("/api/documents/popular");
};

export const loadDocument = async (documentId: string): Promise<AxiosResponse<{ document: Document }>> => {
  return instance.get(`/api/documents/${documentId}`);
};

export const prepurchaseDocument = async (payload: Dictionary): Promise<AxiosResponse<Dictionary>> => {
  return instance.post("/api/payments/prepay", payload);
};

export const checkPurchaseDocument = async (paymentId: string): Promise<AxiosResponse<Dictionary>> => {
  return instance.get(`/api/payments/check/${paymentId}`);
};

// ADMIN //

export const adminCreateDocument = async (title: string, organization: string, description: string, file: File) => {
  const form = new FormData();
  form.append("title", title);
  form.append("organization", organization);
  if (description) form.append("description", description);
  form.append("file", file);

  return instance.post("/api/documents/admin/upload", form, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const adminPrerenderDocument = async (documentId: string) => {
  return instance.post(`/api/documents/admin/prerender/${documentId}`);
};

export const adminDeleteDocument = async (documentId: string) => {
  return instance.delete(`/api/documents/admin/${documentId}`);
};

export const adminCreateDownloadLink = async (documentId: string, expiresIn: number | null = null) => {
  const params: Dictionary = {};

  if (expiresIn) params.expires_in = expiresIn;

  return instance.get(`/api/documents/admin/donwload/${documentId}`, { params });
};

export const adminGrantAccess = async (
  documentId: string,
  userId: string,
  expiresIn: number = DEFAULT_DOCUMENT_EXPIRATION_TIME_SEC,
  notifyUser: boolean = true
) => {
  const payload = {
    document_id: documentId,
    user_id: userId,
    expires_in: expiresIn,
    notify_user: !!notifyUser
  };
  return instance.post("/api/documents/admin/grant", payload);
};

export const adminUpdateDocument = async (document: Document) => {
  return instance.put(`/api/documents/admin/${document.id}`, document);
};

export const adminDeleteUser = async (userId: string): Promise<AxiosResponse<Dictionary>> => {
  return instance.delete(`/api/accounts/${userId}`);
};

export const adminUpdateUser = async (user: Dictionary): Promise<AxiosResponse<{ user: Dictionary }>> => {
  return instance.put(`/api/accounts/${user.id}`, user);
};

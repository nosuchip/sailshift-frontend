import axios, { AxiosResponse } from "axios";
import { Pagination, PaginatedApiResult } from "@/typing/paginations";
import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { Purchase } from "@/typing/purchase";

export const instance = axios.create({
  baseURL: "http://localhost:5000"
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
  return instance.post("/api/contact", { email, subject, message });
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

export const loadDocuments = async (pagination: Pagination) => {
  return instance.get("/api/documents/", { params: pagination });
};

export const loadUsers = async (pagination: Pagination): Promise<PaginatedApiResult<User>> => {
  return instance.get("/api/users/");
};

export const loadPurchases = async (pagination: Pagination): Promise<PaginatedApiResult<Purchase>> => {
  return instance.get("/api/purchases/");
};

export const adminCreateDocument = async (title: string, organization: string, description: string, file: File) => {
  const form = new FormData();
  form.append("title", title);
  form.append("organization", organization);
  if (description) form.append("description", description);
  form.append("file", file);

  return instance.post("/api/documents/admin/upload", form, { headers: {
    "Content-Type": "multipart/form-data"
  } });
};

export const adminDeleteDocument = async (document: Document) => {
  return instance.delete(`/api/documents/admin/${document.id}`);
};

import axios from "axios";

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

export const resetPassword = (
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

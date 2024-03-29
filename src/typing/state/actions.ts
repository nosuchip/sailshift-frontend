import { User, UserDocuments } from "../user";
import { Document } from "../document";
import { Pagination, PaginatedApiResult } from "../paginations";
import { Dictionary } from "../generics";
import { PurchasePrepaymentPayload } from "../purchase";
import { Notification } from "../notification";

export interface NotificationActionType {
  (notification: Notification | null): void;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginActionType {
  (payload: LoginPayload): User | null;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordType {
  (payload: ForgotPasswordPayload): void;
}

export interface ContactPayload {
  email: string;
  subject: string;
  message: string;
}

export interface ContactActionType {
  (payload: ContactPayload): void;
}

export interface RegisterPayload {
  email: string;
  password: string;
  confirmation: string;
}

export interface RegisterActionType {
  (payload: RegisterPayload): void;
}

export interface ResetPayload {
  token: string;
  password: string;
  confirmation: string;
}

export interface ResetPasswordActionType {
  (payload: ResetPayload): void;
}

export interface CreateDocumentPayload {
  title: string;
  organization?: string;
  department?: string;
  description?: string;
  file: File;
}

export interface DocumentCreateActionType {
  (document: CreateDocumentPayload): Document | null;
}

export interface DocumentUpdateActionType {
  ({ document }: { document: Document }): Document | null;
}

export interface DocumentDeleteActionType {
  (document: Document): void;
}

export interface DocumentsLoadActionType {
  (pagination?: Pagination): PaginatedApiResult<Document>;
}

export interface DocumentSearchActionType {
  (filters: Dictionary, pagination?: Pagination): PaginatedApiResult<Document>;
}

export interface LoadPopularDocumentsType {
  (): Document[];
}

export interface DocumentLoadActionType {
  (documentId: string): Document;
}

export interface PurchasePrepaymentActionType {
  (payload: PurchasePrepaymentPayload): any;
}

export interface CheckPurchaseActionType {
  (paymentId: string): any;
}

export interface GetUserDocumentsActionType {
  (): UserDocuments;
}

export interface UserUpdateActionType {
  ({ user }: { user: Partial<User> }): User | null;
}

export interface UserDeleteActionType {
  (user: User): void;
}

export interface UserToggleActionType {
  (user: User): void;
}

export interface UsersLoadActionType {
  (pagination?: Pagination): PaginatedApiResult<Document>;
}

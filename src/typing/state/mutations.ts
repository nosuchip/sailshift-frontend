import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { Purchase } from "@/typing/purchase";
import { Notification } from "@/typing/notification";

export interface LoadingMutationType {
  (loading: boolean): void;
}

export interface LogoutMutationType {
  (): void;
}

export interface NotificationMutationType {
  (notification: Notification | null): void;
}

export interface UserMutationType {
  ({ user }: { user: User }): void;
}

export interface TokenMutationType {
  ({ token }: { token: string | null }): void;
}

export interface DocumentsMutationType {
  ({ documents }: { documents: Document[] }): void;
}

export interface CurrentDocumentMutationType {
  ({ document }: { document: Document | null }): void;
}

export interface PurchasesMutationType {
  ({ purchases }: { purchases: Purchase[] }): void;
}

export interface CurrentPurchaseMutationType {
  ({ purchase }: { purchase: Purchase | null }): void;
}

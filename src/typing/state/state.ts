import { User } from "../user";
import { Document } from "../document";
import { Purchase } from "../purchase";
import { Notification } from "../notification";
import { PaginatedApiResult } from "../paginations";

export interface State {
  loading: boolean;
  notification: Notification | null;

  user: User | null;
  token: string | null;

  documents: PaginatedApiResult<Document>;
  currentDocument: Document | null;

  purchases: PaginatedApiResult<Purchase>;
  currentPurchase: Purchase | null;

  users: PaginatedApiResult<User>;
}

import { User } from "../user";
import { Document } from "../document";
import { Purchase } from "../purchase";
import { Notification } from "../notification";

export interface State {
  loading: boolean;
  notification: Notification | null;

  user: User | null;
  token: string | null;

  documents: Document[];
  currentDocument: Document | null;

  purchases: Purchase[];
  currentPurchase: Purchase | null;
}

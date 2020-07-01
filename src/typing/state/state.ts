import { User } from "../user";
import { Document } from "../document";
import { Purchase } from "../purchase";
import { Notification } from "../notification";
import { Payment } from "../payment";

export interface State {
  loading: boolean;
  notification: Notification | null;

  user: User | null;
  token: string | null;

  documents: Document[];
  currentDocument: Document | null;

  popularDocuments: Document[];

  purchases: Purchase[];
  currentPurchase: Purchase | null;

  payment: Payment | null;

  users: User[];
  editUser: User | null;

  stripePublishableKey: string | null;
}

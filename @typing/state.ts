import { Commit } from 'vuex';
import { User } from './user';
import { Document } from './document';
import { Purchase } from './purchase';
import { Notification } from './notification';

export interface AppState {
    loading: boolean;
    notification: Notification | null;
}

export interface UserState {
    user: User | null;
    token: string | null;
}

export interface DocumentsState {
    documents: Document[];
    currentDocument: Document | null;
}

export interface PurchasesState {
    purchases: Purchase[];
    currentPurchase: Purchase | null;
}

export interface RootState {}

export interface State {
    app: AppState;
    user: UserState;
    documents: DocumentsState;
    purchases: PurchasesState;
}

export interface CommitState<S = State> {
    commit: Commit;
    state: S;
}

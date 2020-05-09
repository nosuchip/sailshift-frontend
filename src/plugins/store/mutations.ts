import { User } from "@/typing/user";
import { Document } from "@/typing/document";
import { Purchase } from "@/typing/purchase";
import { State } from "@/typing/state";
import { Notification } from "@/typing/notification";

import { mutations } from "./types";
import { PaginatedApiResult } from "@/typing/paginations";

export default {
  [mutations.LOADING]: (state: State, loading: boolean) => {
    state.loading = loading;
  },

  [mutations.NOTIFICATION]: (state: State, notification: Notification) => {
    state.notification = notification;
  },

  [mutations.LOGIN]: (state: State, { user, token }: { user: User, token: string }) => {
    state.user = user;
    state.token = token;
  },

  [mutations.LOGOUT]: (state: State) => {
    state.user = null;
    state.token = null;
  },

  [mutations.USER]: (state: State, { user }: { user: User | null }) => {
    state.user = user;
  },

  [mutations.TOKEN]: (state: State, { token }: { token: string | null }) => {
    state.token = token;
  },

  [mutations.DOCUMENTS]: (state: State, payload: PaginatedApiResult<Document>) => {
    state.documents = payload;
  },

  [mutations.CURRENT_DOCUMENT]: (state: State, { document }: { document: Document | null }) => {
    state.currentDocument = document;
  },

  [mutations.PURCHASES]: (state: State, payload: PaginatedApiResult<Purchase>) => {
    state.purchases = payload;
  },

  [mutations.CURRENT_PURCHASE]: (state: State, { purchase }: { purchase: Purchase | null }) => {
    state.currentPurchase = purchase;
  },

  [mutations.USERS]: (state: State, payload: PaginatedApiResult<User>) => {
    state.users = payload;
  }
};

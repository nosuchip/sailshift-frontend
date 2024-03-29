import Vue from "vue";
import Vuex, { MutationPayload } from "vuex";
import { State } from "@/typing/state/state";
import createPersistedState from "vuex-persistedstate";

import actionsHandlers from "./actions";
import mutationsHandlers from "./mutations";
import * as api from "@/plugins/api";

Vue.use(Vuex);

// interface Getters {
//   isLoggedOn: (state: State) => boolean;
//   isAdmin: (state: State) => boolean;
// }

export const store = new Vuex.Store<State>({
  state: {
    loading: false,
    notification: null,

    user: null,
    token: null,

    documents: [],
    currentDocument: null,

    popularDocuments: [],

    purchases: [],
    currentPurchase: null,

    payment: null,

    users: [],
    editUser: null,

    stripePublishableKey: null
  },

  getters: {
    isLoggedOn: (state: State) => !!(state.user && state.token),
    isAdmin: (state: State) => !!(state.user && state.user.role === "admin")
  },

  mutations: mutationsHandlers,
  actions: actionsHandlers,

  plugins: [createPersistedState({
    paths: [
      "token",
      "user"
    ]
  })]
});

store.subscribe((mutation: MutationPayload, state: State) => {
  api.setToken(state.token);
});

export const getEmptyDocument = () => ({
  id: "",
  title: "",
  organization: "",
  department: "",
  description: "",
  text: "",
  price: 10.0
});

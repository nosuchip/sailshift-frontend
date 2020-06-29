import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import "./registerServiceWorker";

import router from "./plugins/router";
import { store } from "./plugins/store";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import "./plugins/meta";

import "roboto-fontface/css/roboto/roboto-fontface.css";
import "vuetify/dist/vuetify.css";

Vue.config.productionTip = false;

axios.defaults.baseURL = process.env.API_BASE_URL || "http://localhost:8081/";

Vue.config.errorHandler = (err, vm, info) => {
  console.error("Vue error:");
  console.error("err:", err);
  console.error("vm:", vm);
  console.error("info:", info);
};

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#root");

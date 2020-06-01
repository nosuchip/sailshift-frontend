import Vue from "vue";
import VueI18n from "vue-i18n";

const flagRussia = require("../assets/img/iconfinder_flag-russia2x_748044.png");
const flagEngland = require("../assets/img/iconfinder_flag-united-kingdom_748024.png");

Vue.use(VueI18n);

const messages = {
  "en": {
    "Some string used somewhere": "Tests"
  },
  "ru": {
    "Some string used somewhere": "Какая-то строка используемая где-то"
  }
};

export const locales = [{
  locale: "ru",
  icon: flagRussia,
  title: "Russian"
}, {
  locale: "en",
  icon: flagEngland,
  title: "English"
}];

export default new VueI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages
});

<template>
  <v-app>
    <!-- <header-nav-bar></header-nav-bar> -->

    <router-view></router-view>

    <v-snackbar v-model="notification" v-if="notification">
      {{ notification.message }}
      <v-btn :color="notification.type" text @click="toggleNotification({ visible: false })">Close</v-btn>
    </v-snackbar>

    <loader></loader>

    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
// import HeaderNavBar from "./components/HeaderNavBar.vue";
import AppFooter from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
import { State, Mutation, Action } from "vuex-class";
import { mutations, actions } from "./plugins/store";
import { detectLocale } from "./utils/locale";

@Component({
  components: {
    // HeaderNavBar,
    AppFooter,
    Loader
  }
})
export default class Application extends Vue {
  @State("notification")
  readonly notification!: Notification;

  // @State("locale")
  // readonly locale!: string;

  // @Action(actions.LOAD_USER_INFO)
  // readonly loadUserInfo!: () => void;

  // mounted () {
  //   let lang = this.locale;
  //   if (!lang) {
  //     const { lang } = detectLocale();
  //   }

  //   this.setLocale({ locale: lang });
  //   this.loadUserInfo();
  // }

  // @Mutation(mutations.LOCALE)
  // setLocale!: ({ locale }: { locale: string }) => void;
}
</script>

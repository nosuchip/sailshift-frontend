<template>
  <v-app>
    <router-view></router-view>

    <v-snackbar v-model="notification" v-if="notification" top multi-line :color="color">
      {{ notification.message }}
      <v-btn :color="notification.type" text @click="setNotification(null)">Close</v-btn>
    </v-snackbar>

    <loader></loader>

    <app-footer></app-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppFooter from "./components/Footer.vue";
import Loader from "./components/Loader.vue";
import { State, Mutation, Action } from "vuex-class";
import { Watch } from "vue-property-decorator";
import { mutations, actions } from "./plugins/store";
import { detectLocale } from "./utils/locale";
import { NotificationActionType } from "./typing/state/actions";
import { Notification } from "@/typing/notification";
import { setToken } from "@/plugins/api";

@Component({
  components: {
    AppFooter,
    Loader
  }
})
export default class Application extends Vue {
  @State("token")
  readonly token!: string | null;

  @State("notification")
  readonly notif!: Notification;

  @Action(actions.NOTIFICATION)
  setNotification!: NotificationActionType;

  get notification () {
    return this.notif;
  }

  set notification (value) {
    this.setNotification(value);
  }

  get color () {
    if (this.notif) {
      switch (this.notif.type) {
        case "success":
          return "green lighten-1";
        case "warn":
          return "amber darken-3";
        case "error":
          return "red darken-1";
      }
    }

    return "blue lighten-1";
  }

  @Watch("token", { immediate: true })
  handleTokenChange (val: string, prevVal: string) {
    if (val && !prevVal) {
      console.log(">> Set token");
      setToken(this.token);
    }
  }

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

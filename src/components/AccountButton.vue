<template>
  <v-menu offset-y v-if="user">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">
        Hello,
        <b>{{ user.name }}</b>
      </v-btn>
    </template>

    <v-list>
      <v-list-item link to="/">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item link to="/document/purchases">
        <v-list-item-title>My purchases</v-list-item-title>
      </v-list-item>

      <v-menu offset-x v-if="isAdmin" open-on-hover left>
        <template v-slot:activator="{ on }">
          <v-list-item link v-on="on">
            <v-list-item-title>Admin</v-list-item-title>
            <v-list-item-action>
              <v-btn icon>
                <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>

        <v-list>
          <v-list-item link to="/admin/list_documents">
            <v-list-item-title>Documents</v-list-item-title>
          </v-list-item>

          <v-list-item link to="/admin/list_users">
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-divider></v-divider>

      <v-list-item link @click="handleLogout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <v-btn v-else color="primary" dark to="/account/login">Login / Register</v-btn>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import DefaultLayout from "@/layouts/default.vue";
import { State, Mutation } from "vuex-class";
import { mutations, actions } from "@/plugins/store";
import { LogoutMutationType } from "@/typing/state/mutations";
import { User } from "@/typing/user";
import { Option, Dictionary } from "@/typing/generics";

@Component({
  components: { DefaultLayout }
})
export default class Contact extends Vue {
  @State("user")
  user!: User;

  @Mutation(mutations.LOGOUT)
  logout!: LogoutMutationType;

  get isAdmin () {
    return this.user && this.user.role === "admin";
  }

  handleLogout () {
    this.logout();
    this.$router.go(0);
  }

  menuItems: Dictionary[] = [
    {
      title: "Home",
      to: "/"
    },
    {
      title: "My purchases",
      to: "/document/purchases"
    },
    {
      title: "Logout",
      click: this.handleLogout
    }
  ];
}
</script>

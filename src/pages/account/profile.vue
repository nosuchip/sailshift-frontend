<template>
  <v-container fill-height fluid class="user=purchases white pa-4 align-start">
    <v-container v-if="user">
      <v-row>
        <v-col>
          <v-text-field
            label="Name"
            v-model="user.name"
          />
        </v-col>
        <v-col>
          <v-text-field
            type="password"
            label="Password"
            v-model="user.password"
            placeholder="********"
            :rules="rules.password"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field label="Email" v-model="user.email" disabled />
        </v-col>
        <v-col>
          <v-text-field
            type="password"
            label="Password confirmation"
            v-model="user.confirmation"
            placeholder="********"
            :rules="rules.password"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-right">
          <v-btn depressed color="blue darken-1 white--text" @click="handleSave">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Mixins } from "vue-property-decorator";
import { Action, Mutation } from "vuex-class";
import { actions, mutations } from "@/plugins/store";
import AsyncOpsControl from "@/mixins/async-ops-control.vue";
import { User } from "../../typing/user";
import { UserUpdateActionType } from "@/typing/state/actions";
import { Dictionary } from "../../typing/generics";
import { UserMutationType } from "../../typing/state/mutations";

@Component({})
export default class Application extends Mixins(AsyncOpsControl) {
  user: User | null = null;

  get roles () {
    return [
      {
        title: "User",
        value: "user"
      },
      {
        title: "Admin",
        value: "admin"
      }
    ];
  }

  rules = {
    password: [
      (v: string) => v ? (v.length >= 6 || "Password must be at least 6 characters long") : true
    ]
  };

  @Action(actions.ADMIN_UPDATE_USER)
  updateUser!: UserUpdateActionType;

  @Mutation(mutations.USER)
  setCurrentUser!: UserMutationType;

  mounted () {
    this.user = { ...this.$store.state.user };
  }

  async handleSave () {
    if (!this.user) return;

    const user: Dictionary = {
      id: this.user.id,
      name: this.user.name,
      active: true
    };

    if (this.user.password || this.user.confirmation) {
      if (this.user.password && this.user.password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }

      if (this.user.confirmation !== this.user.password) {
        alert("Password and confirmation must match");
        return;
      }

      user.password = this.user.password;
      user.confirmation = this.user.confirmation;
    }

    await this.runWithLoading(async () => {
      const updatedUser = await this.runWithLoading<any>(() => this.updateUser({ user }));
      this.setCurrentUser({ user: updatedUser });
    });
  }
}
</script>

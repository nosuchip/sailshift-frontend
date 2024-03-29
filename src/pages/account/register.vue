<template>
  <v-row justify="center">
    <v-col cols="12" xs="12" md="6">
      <v-card max-width>
        <v-card-title>Register</v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="handleSubmit">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
              :rules="rules.email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              :rules="rules.password"
            ></v-text-field>

            <v-text-field
              v-model="confirmation"
              label="Password confirmation"
              type="password"
              required
              :rules="rules.password"
            ></v-text-field>

            <v-row class="align-center">
              <v-col class="pb-0">
                <v-btn type="submit" color="primary">Register</v-btn>
                <span class="separator pl-4 pr-4">OR</span>
                <router-link to="/account/login" class="no-underline">Already have an account?</router-link>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.no-underline {
  text-decoration: none;
}

.small {
  font-size: 75%;
}
</style>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace, Mutation, Action } from "vuex-class";
import { ValidatableElement } from "@/typing/generics";
import { mutations, actions } from "@/plugins/store";
import { LoadingMutationType } from "@/typing/state/mutations";
import { RegisterActionType } from "@/typing/state/actions";

@Component({
  components: {}
})
export default class Contact extends Vue {
  @Mutation(mutations.LOADING)
  loading!: LoadingMutationType;

  @Action(actions.REGISTER)
  register!: RegisterActionType;

  email: string = "";
  password: string = "";
  confirmation: string = "";
  valid = true;

  rules = {
    password: [
      (v: string) => !!v || "Password is required",
      (v: string) => v.length >= 6 || "Password must be at least 6 characters long"
    ],
    email: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  };

  get form (): ValidatableElement {
    return this.$refs.form as ValidatableElement;
  }

  async handleSubmit () {
    if (!this.form.validate()) {
      return;
    }

    if (this.password !== this.confirmation) {
      alert("Password must match confirmation"); ;
      return;
    }

    this.loading(true);
    try {
      await this.register({
        email: this.email,
        password: this.password,
        confirmation: this.confirmation
      });
    } finally {
      this.loading(false);
    }
  }
}
</script>

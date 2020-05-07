<template>
    <v-row justify="center">
        <v-col cols="12" xs="12" md="6">
            <v-card max-width>
                <v-card-title v-if="token">
                    Set new password
                </v-card-title>
                <v-card-title
                    v-else
                    class="red--text lighten-1 display-1 justify-center"
                >
                    Token is invalid
                </v-card-title>

                <v-card-text v-if="token">
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        @submit.prevent="handleSubmit"
                    >
                        <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="confirmation"
                            label="Confirmation"
                            type="password"
                            required
                        ></v-text-field>

                        <v-row class="align-center">
                            <v-col class="pt-0 pb-0">
                                <v-btn type="submit" color="primary">
                                    Set new password
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace, Action, Mutation } from "vuex-class";
import { ValidatableElement } from "@/typing/generics";
import { mutations, actions } from "@/plugins/store";
import { LoadingMutationType } from "@/typing/state/mutations";
import { ResetPasswordActionType } from "@/typing/state/actions";

@Component({
  components: {}
})
export default class Contact extends Vue {
    @Mutation(mutations.LOADING)
    loading!: LoadingMutationType;

    @Action(actions.RESET_PASSWORD)
    resetPassword!: ResetPasswordActionType;

    password: string = "";
    confirmation: string = "";
    token: string = "";
    valid = true;

    created () {
      this.token = this.$route.params.token;
    }

    get form (): ValidatableElement {
      return this.$refs.form as ValidatableElement;
    }

    async handleSubmit () {
      if (!this.form.validate()) {
        return;
      }

      this.loading(true);
      try {
        await this.resetPassword({
          password: this.password,
          confirmation: this.confirmation,
          token: this.token
        });
      } finally {
        this.loading(false);
      }
    }
}
</script>
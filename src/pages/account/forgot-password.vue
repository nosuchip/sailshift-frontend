<template>
    <v-row justify="center">
        <v-col cols="12" xs="12" md="6">
            <v-card max-width>
                <v-card-title>
                    Forgot password?
                </v-card-title>

                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        @submit.prevent="handleSubmit"
                    >
                        <v-text-field
                            v-model="email"
                            label="E-mail"
                            :rules="rules.email"
                            required
                        ></v-text-field>

                        <v-row>
                            <v-col class="text-right pt-0">
                                <router-link
                                    to="/account/login"
                                    class="no-underline small"
                                    >Remember your password?</router-link
                                >
                            </v-col>
                        </v-row>

                        <v-btn type="submit" color="primary">
                            Reset
                        </v-btn>
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
import { ForgotPasswordType } from "@/typing/state/actions";

@Component({
  components: {}
})
export default class Contact extends Vue {
    @Mutation(mutations.LOADING)
    loading!: LoadingMutationType;

    @Action(actions.FORGOT_PASSWORD)
    forgotPassword!: ForgotPasswordType;

    email: string = "";
    valid = true;

    rules = {
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

      this.loading(true);
      try {
        await this.forgotPassword({ email: this.email });
      } catch (error) {
        console.error(">>>", error);
      } finally {
        this.loading(false);
      }
    }
}
</script>

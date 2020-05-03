<template>
    <v-row justify="center">
        <v-col cols="12" xs="12" md="6">
            <v-card max-width>
                <v-card-title>
                    Login
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
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            required
                        ></v-text-field>

                        <v-row>
                            <v-col class="text-right pt-0">
                                <nuxt-link
                                    to="/account/forgot-password"
                                    class="no-underline small"
                                    >Forgot password?</nuxt-link
                                >
                            </v-col>
                        </v-row>

                        <v-row class="align-center">
                            <v-col class="pt-0 pb-0">
                                <v-btn type="submit" color="primary">
                                    Login
                                </v-btn>
                                <span class="separator pl-4 pr-4"> OR </span>
                                <nuxt-link
                                    to="/account/register"
                                    class="no-underline"
                                    >Register</nuxt-link
                                >
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { ValidatableElement } from '~/@typing/generics';
import mutations, { LoadingMutationType } from '~/plugins/mutations';
import actions, { LoginActionType } from '~/plugins/actions';

const appModule = namespace('app');
const userModule = namespace('user');

@Component({
    layout: 'account',
    components: {}
})
export default class Contact extends Vue {
    @appModule.Mutation(mutations.app.LOADING)
    loading!: LoadingMutationType;

    @userModule.Action(actions.user.LOGIN)
    login!: LoginActionType;

    email: string = '';
    password: string = '';
    valid = true;

    get form(): ValidatableElement {
        return this.$refs.form as ValidatableElement;
    }

    async handleSubmit() {
        if (!this.form.validate()) {
            return;
        }

        this.loading(true);
        try {
            await this.login({ email: this.email, password: this.password });
        } finally {
            this.loading(false);
        }
    }
}
</script>

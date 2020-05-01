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
                        <v-btn type="submit" color="primary">
                            Login
                        </v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { namespace } from 'vuex-class';
import { ValidatableElement } from '~/@typing/generics';
import mutations, {
    LoadingMutationType,
    NotificationMutationType
} from '~/plugins/mutations';
import actions, { LoginActionType } from '~/plugins/actions';

const appModule = namespace('app');
const userModule = namespace('user');

@Component({
    components: {}
})
export default class Contact extends Vue {
    @appModule.Mutation(mutations.LOADING)
    loading!: LoadingMutationType;

    @appModule.Mutation(mutations.NOTIFICATION)
    notification!: NotificationMutationType;

    @userModule.Action(actions.LOGIN)
    login!: LoginActionType;

    email: string = '';
    password: string = '';

    get form(): ValidatableElement {
        return this.$refs.form as ValidatableElement;
    }

    async handleSubmit() {
        if (!this.form.validate()) {
            return;
        }

        this.loading(true);
        try {
            this.login({ email: this.email, password: this.password });
            const res = await this.login({
                email: this.email,
                password: this.password
            });
            console.log('login res:', res);
        } catch (error) {
            this.notification({
                message: 'Unable to send message',
                type: 'error'
            });
        } finally {
            this.loading(false);
        }
    }
}
</script>

<template>
    <v-row justify="center">
        <v-col cols="12" xs="12" md="6">
            <v-card max-width>
                <v-card-title>
                    <div class="display-2">Contact</div>
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
                            :rules="rules.email"
                            label="E-mail"
                            required
                        ></v-text-field>

                        <v-text-field
                            v-model="subject"
                            :rules="rules.subject"
                            label="Subject"
                            required
                        ></v-text-field>

                        <v-textarea
                            v-model="message"
                            :rules="rules.message"
                            label="Message"
                            required
                        >
                        </v-textarea>

                        <v-btn type="submit" color="primary">
                            Send
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
import mutations, { LoadingMutationType } from '~/plugins/mutations';
import actions, { ContactActionType } from '~/plugins/actions';
import * as api from '~/plugins/api';

const appModule = namespace('app');

@Component({
    components: {}
})
export default class Contact extends Vue {
    @appModule.Mutation(mutations.app.LOADING)
    loading!: LoadingMutationType;

    @appModule.Action(actions.app.CONTACT)
    contactUs!: ContactActionType;

    valid: boolean = true;

    email: string = '';
    subject: string = '';
    message: string = '';

    rules = {
        email: [
            (v: string) => !!v || 'E-mail is required',
            (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        subject: [(v: string) => !!v || 'Subject is required'],
        message: [(v: string) => !!v || 'Message is required']
    };

    get form(): ValidatableElement {
        return this.$refs.form as ValidatableElement;
    }

    async handleSubmit() {
        if (!this.form.validate()) {
            return;
        }

        this.loading(true);

        try {
            await api.contactUs(this.email, this.subject, this.message);
        } finally {
            this.loading(false);
        }
    }
}
</script>

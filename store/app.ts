import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import mutations from '~/plugins/mutations';
import actions from '~/plugins/actions';
import { Notification } from '~/@typing/notification';
import * as api from '~/plugins/api';

@Module({
    stateFactory: true,
    namespaced: true
})
export default class AppStateModule extends VuexModule {
    loading: boolean = false;
    notification: Notification | null = null;

    @Mutation
    [mutations.app.LOADING](loading: boolean) {
        this.loading = loading;
    }

    @Mutation
    [mutations.app.NOTIFICATION](notification: Notification | null) {
        this.notification = notification;
    }

    @Action
    [actions.app.NOTIFICATION](notification: Notification | null) {
        const context = this.context;
        context.commit(mutations.app.NOTIFICATION, notification);

        setTimeout(() => {
            context.commit(mutations.app.NOTIFICATION, {
                message: null,
                type: null
            });
        }, 3000);
    }

    @Action({ commit: mutations.app.NOTIFICATION })
    async [actions.app.CONTACT]({
        email,
        subject,
        message
    }: {
        email: string;
        subject: string;
        message: string;
    }) {
        try {
            await api.contactUs(email, subject, message);
            return { message: 'Thank you for your message', type: 'success' };
        } catch (error) {
            return { message: 'Unable to send message', type: 'error' };
        }
    }
}

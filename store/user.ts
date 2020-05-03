import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import { User } from '~/@typing/user';
import * as api from '~/plugins/api';
import mutations from '~/plugins/mutations';
import actions, {
    RegisterPayload,
    ForgotPasswordPayload,
    LoginPayload,
    ResetPayload
} from '~/plugins/actions';
import { userMapper } from '~/plugins/mappers';

@Module({
    stateFactory: true,
    namespaced: true
})
export default class UserStateModule extends VuexModule {
    user: User | null = null;
    token: string | null = null;

    get isAuthenticated() {
        return !!this.user || !!this.token;
    }

    @Mutation
    [mutations.user.LOGIN]({
        user,
        token
    }: {
        user: User | null;
        token: string | null;
    }) {
        this.user = user;
        this.token = token;
    }

    @Mutation
    [mutations.user.LOGOUT]() {
        this.user = null;
        this.token = null;

        api.resetToken();
    }

    @Action
    async [actions.user.LOGIN]({ email, password }: LoginPayload) {
        const result: { user: User | null; token: string | null } = {
            user: null,
            token: null
        };

        try {
            const { data } = await api.login(email, password);

            const { user, token }: { user?: User; token?: string } = data;

            if (!user || !token) {
                throw new Error('User or token missing');
            }

            result.user = userMapper.fromBackend(user);
            result.token = token;
        } catch (error) {
            this.context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message: 'Incorrect username or password',
                    type: 'error'
                },
                { root: true }
            );
        }

        api.setToken(result.token);

        this.context.commit(mutations.user.LOGIN, result);
    }

    @Action
    async [actions.user.FORGOT_PASSWORD]({ email }: ForgotPasswordPayload) {
        const context = this.context;

        try {
            await api.forgotPassword(email);
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message:
                        'Email with password restore link sent to your email',
                    type: 'success'
                },
                { root: true }
            );
        } catch (error) {
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message:
                        'Unable to send reset password instructions to desired email.',
                    type: 'error'
                },
                { root: true }
            );
        }
    }

    @Action
    async [actions.user.REGISTER]({
        email,
        password,
        confirmation
    }: RegisterPayload) {
        const context = this.context;

        try {
            await api.register(email, password, confirmation);
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message:
                        'Your account created successfully. Please check your email for confirmation letter.',
                    type: 'success'
                },
                { root: true }
            );
        } catch (error) {
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message:
                        'Unable to create account with such email or password.',
                    type: 'error'
                },
                { root: true }
            );
        }
    }

    @Action
    async [actions.user.RESET_PASSWORD]({
        token,
        password,
        confirmation
    }: ResetPayload) {
        const context = this.context;

        try {
            await api.resetPassword(token, password, confirmation);
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message: 'New password was set. Please login now',
                    type: 'success'
                },
                { root: true }
            );
        } catch (error) {
            context.dispatch(
                `app/${actions.app.NOTIFICATION}`,
                {
                    message: 'Unable to set new password.',
                    type: 'error'
                },
                { root: true }
            );
        }
    }
}

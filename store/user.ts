import {
    Module,
    VuexModule,
    Mutation,
    MutationAction
} from 'vuex-module-decorators';

import { User } from '~/@typing/user';
import * as api from '~/plugins/api';
import mutations from '~/plugins/mutations';

@Module({
    name: 'user',
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
    [mutations.LOGOUT]() {
        this.user = null;
        this.token = null;

        api.resetToken();
    }

    @MutationAction({ mutate: ['user', 'token'] })
    async login({ email, password }: { email: string; password: string }) {
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

            result.user = user;
            result.token = token;
        } catch (error) {}

        api.setToken(result.token);

        return result;
    }
}

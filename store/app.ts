import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import mutations from '~/plugins/mutations';
import { Notification } from '~/@typing/notification';

@Module({
    name: 'app',
    stateFactory: true,
    namespaced: true
})
export default class AppStateModule extends VuexModule {
    loading: boolean = false;
    notification: Notification | null = null;

    @Mutation
    [mutations.LOADING](loading: boolean) {
        this.loading = loading;
    }

    @Mutation
    [mutations.NOTIFICATION](notification: Notification | null) {
        this.notification = notification;
    }
}

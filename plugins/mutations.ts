export default {
    app: {
        LOADING: 'LOADING',
        NOTIFICATION: 'NOTIFICATION'
    },

    user: {
        LOGIN: 'LOGIN',
        LOGOUT: 'LOGOUT'
    }
};

export interface LoadingMutationType {
    (loading: boolean): void;
}

export interface NotificationMutationType {
    ({ message, type }: { message: string; type: string }): void;
}

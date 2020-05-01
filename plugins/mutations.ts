export default {
    LOGOUT: 'LOGOUT',
    LOADING: 'LOADING',
    NOTIFICATION: 'NOTIFICATION'
};

export interface LoadingMutationType {
    (loading: boolean): void;
}

export interface NotificationMutationType {
    ({ message, type }: { message: string; type: string }): void;
}

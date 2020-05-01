export default {
    LOGIN: 'LOGIN'
};

export interface LoginActionType {
    ({ email, password }: { email: string; password: string }): void;
}

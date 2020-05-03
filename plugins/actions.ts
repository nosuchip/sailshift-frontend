export default {
    app: {
        NOTIFICATION: 'notification',
        CONTACT: 'contact'
    },

    user: {
        LOGIN: 'login',
        FORGOT_PASSWORD: 'forgot_password',
        REGISTER: 'register',
        RESET_PASSWORD: 'reset_password'
    }
};

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginActionType {
    (payload: LoginPayload): void;
}

export interface ForgotPasswordPayload {
    email: string;
}

export interface ForgotPasswordType {
    (payload: ForgotPasswordPayload): void;
}

export interface ContactPayload {
    email: string;
    subject: string;
    message: string;
}

export interface ContactActionType {
    (payload: ContactPayload): void;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmation: string;
}

export interface RegisterActionType {
    (payload: RegisterPayload): void;
}

export interface ResetPayload {
    token: string;
    password: string;
    confirmation: string;
}

export interface ResetPasswordActionType {
    (payload: ResetPayload): void;
}

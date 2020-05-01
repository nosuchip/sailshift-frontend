import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

export const resetToken = () => {
    delete instance.defaults.headers.common.Authorization;
};

export const setToken = (token?: string | null) => {
    if (!token) {
        return resetToken();
    }

    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const login = (email: string, password: string) => {
    return instance.post('/accounts/login', { email, password });
};

export const contactUs = (email: string, subject: string, message: string) => {
    return instance.post('/contact', { email, subject, message });
};

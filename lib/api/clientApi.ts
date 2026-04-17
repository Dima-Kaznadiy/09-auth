import { instance } from './api';

export const login = async (data: {
    email: string;
    password: string;
}) => {
    const res = await instance.post('/auth/login', data);
    return res.data;
};

export const register = async (data: {
    email: string;
    password: string;
}) => {
    const res = await instance.post('/auth/register', data);
    return res.data;
};

export const logout = async () => {
    await instance.post('/auth/logout');
};

export const checkSession = async () => {
    const res = await instance.get('/auth/session');
    return res.data;
};
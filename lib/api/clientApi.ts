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

export const updateMe = async (data: { username: string }) => {
    const res = await instance.patch('/users/me', data);
    return res.data;
};



export const fetchNotes = async ({
    page,
    search,
    tag,
}: {
    page: number;
    search: string;
    tag: string;
}) => {
    const res = await instance.get('/notes', {
        params: {
            page,
            perPage: 12,
            search,
            tag: tag === 'all' ? undefined : tag,
        },
    });

    return res.data;
};


export const fetchNoteById = async (id: string) => {
    const res = await instance.get(`/notes/${id}`);
    return res.data;
};


export const createNote = async (data: {
    title: string;
    content: string;
    tag: string;
}) => {
    const res = await instance.post('/notes', data);
    return res.data;
};


export const deleteNote = async (id: string) => {
    await instance.delete(`/notes/${id}`);
};
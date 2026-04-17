

import { instance } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

// 🔥 AUTH

export const login = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await instance.post<User>('/auth/login', data);
    return res.data;
};

export const register = async (data: {
    email: string;
    password: string;
}): Promise<User> => {
    const res = await instance.post<User>('/auth/register', data);
    return res.data;
};

export const logout = async (): Promise<void> => {
    await instance.post('/auth/logout');
};

export const checkSession = async (): Promise<User> => {
    const res = await instance.get<User>('/auth/session');
    return res.data;
};

export const updateMe = async (data: {
    username: string;
}): Promise<User> => {
    const res = await instance.patch<User>('/users/me', data);
    return res.data;
};

// 🔥 NOTES

export const fetchNotes = async ({
    page,
    search,
    tag,
}: {
    page: number;
    search: string;
    tag: NoteTag | 'all';
}): Promise<{ notes: Note[]; totalPages: number }> => {
    const res = await instance.get<{ notes: Note[]; totalPages: number }>(
        '/notes',
        {
            params: {
                page,
                perPage: 12,
                search,
                tag: tag === 'all' ? undefined : tag,
            },
        }
    );

    return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const res = await instance.get<Note>(`/notes/${id}`);
    return res.data;
};

export const createNote = async (data: {
    title: string;
    content: string;
    tag: NoteTag;
}): Promise<Note> => {
    const res = await instance.post<Note>('/notes', data);
    return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const res = await instance.delete<Note>(`/notes/${id}`);
    return res.data;
};

export const getMe = async (): Promise<User> => {
    const res = await instance.get<User>('/users/me');
    return res.data;
};
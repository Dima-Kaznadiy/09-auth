

import { instance } from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note, NoteTag } from '@/types/note';


export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const res = await instance.get<User>('/users/me', {
        headers: {
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
    });

    return res.data;
};


export const checkSession = async (): Promise<{
    accessToken: string;
    refreshToken: string;
}> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const res = await instance.get<{
        accessToken: string;
        refreshToken: string;
    }>('/auth/session', {
        headers: {
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
    });

    return res.data;
};


export const fetchNotes = async ({
    page,
    search,
    tag,
}: {
    page: number;
    search: string;
    tag: NoteTag | 'all';
}): Promise<{ notes: Note[]; totalPages: number }> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const res = await instance.get<{ notes: Note[]; totalPages: number }>(
        '/notes',
        {
            params: {
                page,
                perPage: 12,
                search,
                tag: tag === 'all' ? undefined : tag,
            },
            headers: {
                Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
            },
        }
    );

    return res.data;
};


export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const res = await instance.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
    });

    return res.data;
};
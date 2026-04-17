import axios from 'axios';


const BASE_URL = 'https://notehub-public.goit.study/api';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
});

// const instance = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: `Bearer ${token}`,
//     },
// });


export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

import type { NoteTag } from '@/types/note';
export interface FetchNotesParams {
    page: number;
    search?: string;
    tag?: NoteTag | 'all';
}


export const fetchNotes = async ({
    page,
    search = '',
    tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
    const { data } = await instance.get<FetchNotesResponse>('/notes', {
        params: {
            page,
            perPage: 12,
            search,
            ...(tag && tag !== 'all' ? { tag } : {}),
        },
    });

    return data;
};


export const createNote = async (
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
    const { data } = await instance.post<Note>('/notes', note);
    return data;
};


export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await instance.delete<Note>(`/notes/${id}`);
    return data;
};

import type { Note } from '@/types/note';

export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await instance.get<Note>(`/notes/${id}`);
    return data;
};
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

export default function NotePreview({ id }: { id: string }) {
    const { data } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    if (!data) return null;

    return (
        <div>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </div>
    );
}
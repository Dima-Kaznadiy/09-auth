

import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetails from './NoteDetails.client';
import type { Metadata } from 'next';

// 🔥 SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;

    const note = await fetchNoteByIdServer(id);

    return {
        title: note.title,
        description: note.content,
        openGraph: {
            title: note.title,
            description: note.content,
            url: `https://your-site.vercel.app/notes/${id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                },
            ],
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteByIdServer(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails id={id} />
        </HydrationBoundary>
    );
}
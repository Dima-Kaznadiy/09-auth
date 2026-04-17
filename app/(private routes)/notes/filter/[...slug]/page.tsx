

import NotesClient from './Notes.client';
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import type { NoteTag } from '@/types/note';
import type { Metadata } from 'next';

// 🔥 SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
    const { slug } = await params;

    const tag = slug?.[0] ?? 'all';

    return {
        title: `Notes - ${tag}`,
        description: `Viewing notes filtered by ${tag}`,
        openGraph: {
            title: `Notes - ${tag}`,
            description: `Viewing notes filtered by ${tag}`,
            url: `https://your-site.vercel.app/notes/filter/${tag}`,
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
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;

    const tag = (slug?.[0] ?? 'all') as NoteTag | 'all';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', tag, 1, ''],
        queryFn: () =>
            fetchNotes({
                page: 1,
                search: '',
                tag,
            }),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
}
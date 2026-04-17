// 'use client';

// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import NotePreview from '@/components/NotePreview/NotePreview';

// export default function ModalPage({
//     params,
// }: {
//     params: { id: string };
// }) {
//     const router = useRouter();

//     return (
//         <Modal onClose={() => router.back()}>
//             <NotePreview id={params.id} />
//         </Modal>
//     );
// }

import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from './NotePreview.client';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={id} />
        </HydrationBoundary>
    );
}
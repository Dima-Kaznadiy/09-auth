



'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

import Link from 'next/link';

interface Props {
    tag: NoteTag | 'all';
}

export default function NotesClient({ tag }: Props) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');


    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['notes', tag, page, debouncedSearch],
        queryFn: () =>
            fetchNotes({
                page,
                search: debouncedSearch,
                tag,
            }),
    });

    const handlePageChange = (selectedPage: number) => {
        setPage(selectedPage);
    };

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error loading notes</p>;

    return (
        <div>

            <Link href="/notes/action/create">
                <button>Create note</button>
            </Link>


            <SearchBox onSearch={handleSearch} />


            {data.notes?.length ? (
                <NoteList notes={data.notes} />
            ) : (
                <p>No notes found</p>
            )}


            <Pagination
                totalPages={data.totalPages}
                currentPage={page}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
'use client';

import { useState } from 'react';
import { updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
    const router = useRouter();

    const [username, setUsername] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await updateMe({ username });

        router.push('/profile');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />

            <button type="submit">Save</button>
        </form>
    );
}
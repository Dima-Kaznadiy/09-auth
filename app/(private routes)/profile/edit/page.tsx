

'use client';

import { useEffect, useState } from 'react';
import { updateMe, getMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';

export default function EditProfilePage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getMe();

            setUsername(user.username);
            setEmail(user.email);
            setAvatar(user.avatar);
        };

        fetchUser();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const updatedUser = await updateMe({ username });


            setUser(updatedUser);

            router.push('/profile');
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>

            <Image
                src={avatar}
                alt="avatar"
                width={100}
                height={100}
            />

            <input
                name="email"
                value={email}
                readOnly
            />

            <input
                name="username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
            />

            <button type="submit">Save</button>


            <button
                type="button"
                onClick={() => router.back()}
            >
                Cancel
            </button>
        </form>
    );
}
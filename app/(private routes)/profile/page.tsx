

import { getMe } from '@/lib/api/serverApi';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Profile',
    description: 'User profile page',
    openGraph: {
        title: 'Profile',
        description: 'User profile page',
        url: 'https://your-site.vercel.app/profile',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            },
        ],
    },
};

export default async function ProfilePage() {
    const user = await getMe();

    return (
        <div>
            <h1>Profile</h1>

            <Image
                src={user.avatar}
                alt="avatar"
                width={100}
                height={100}
            />

            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>

            {/* 🔥 ОБОВʼЯЗКОВО */}
            <Link href="/profile/edit">Edit profile</Link>
        </div>
    );
}
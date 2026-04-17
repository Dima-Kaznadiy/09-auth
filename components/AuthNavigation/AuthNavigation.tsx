

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
    const router = useRouter();

    const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        clearIsAuthenticated();


        router.push('/sign-in');
    };


    if (!isAuthenticated) {
        return (
            <>
                <li>
                    <Link href="/sign-in">Login</Link>
                </li>
                <li>
                    <Link href="/sign-up">Register</Link>
                </li>
            </>
        );
    }


    return (
        <>
            <li>
                <span>{user?.email}</span>
            </li>
            <li>
                <Link href="/profile">Profile</Link>
            </li>
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
        </>
    );
}
'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';

export default function AuthNavigation() {
    const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        clearIsAuthenticated();
    };

    if (!isAuthenticated) {
        return (
            <div>
                <Link href="/sign-in">Login</Link>
                <Link href="/sign-up">Register</Link>
            </div>
        );
    }

    return (
        <div>
            <span>{user?.email}</span>
            <Link href="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
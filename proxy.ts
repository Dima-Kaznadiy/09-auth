


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkSession } from '@/lib/api/serverApi';

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const isAuthPage =
        request.nextUrl.pathname.startsWith('/sign-in') ||
        request.nextUrl.pathname.startsWith('/sign-up');

    const isPrivatePage =
        request.nextUrl.pathname.startsWith('/profile') ||
        request.nextUrl.pathname.startsWith('/notes');

    let isAuthenticated = false;


    if (accessToken) {
        isAuthenticated = true;
    }

    // 🔥 REFRESH ЛОГІКА
    if (!accessToken && refreshToken) {
        try {
            const data = await checkSession();

            isAuthenticated = true;

            const response = NextResponse.next();

            if (data?.data.accessToken) {
                response.cookies.set('accessToken', data.data.accessToken);
            }

            if (data?.data.refreshToken) {
                response.cookies.set('refreshToken', data.data.refreshToken);
            }


            if (isAuthPage) {
                return NextResponse.redirect(new URL('/', request.url));
            }

            return response;
        } catch {
            isAuthenticated = false;
        }
    }


    if (!isAuthenticated && isPrivatePage) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // ❗ авторизований НЕ має бути на auth сторінках
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
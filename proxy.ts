

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

    // 🔥 REFRESH
    if (!accessToken && refreshToken) {
        try {
            const data = await checkSession();

            isAuthenticated = true;

            // ❗ якщо треба редірект — робимо його з куками
            if (isAuthPage) {
                const redirectResponse = NextResponse.redirect(
                    new URL('/', request.url)
                );

                if (data.data?.accessToken) {
                    redirectResponse.cookies.set('accessToken', data.data.accessToken);
                }

                if (data.data?.refreshToken) {
                    redirectResponse.cookies.set('refreshToken', data.data.refreshToken);
                }

                return redirectResponse;
            }

            // ❗ якщо НЕ редірект — звичайний response
            const response = NextResponse.next();

            if (data.data?.accessToken) {
                response.cookies.set('accessToken', data.data.accessToken);
            }

            if (data.data?.refreshToken) {
                response.cookies.set('refreshToken', data.data.refreshToken);
            }

            return response;
        } catch {
            isAuthenticated = false;
        }
    }

    // ❌ не авторизований
    if (!isAuthenticated && isPrivatePage) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // ❗ авторизований не має бути на auth сторінках
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';


// export function proxy(request: NextRequest) {
//     const isAuth = request.cookies.get('token');

//     const isAuthPage =
//         request.nextUrl.pathname.startsWith('/sign-in') ||
//         request.nextUrl.pathname.startsWith('/sign-up');

//     const isPrivatePage =
//         request.nextUrl.pathname.startsWith('/profile') ||
//         request.nextUrl.pathname.startsWith('/notes');

//     if (!isAuth && isPrivatePage) {
//         return NextResponse.redirect(new URL('/sign-in', request.url));
//     }

//     if (isAuth && isAuthPage) {
//         return NextResponse.redirect(new URL('/profile', request.url));
//     }

//     return NextResponse.next();
// }

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

    // 🔥 якщо є accessToken → вважаємо що залогінений
    if (accessToken) {
        isAuthenticated = true;
    }

    // 🔥 якщо немає accessToken але є refresh → пробуємо відновити сесію
    if (!accessToken && refreshToken) {
        try {
            const data = await checkSession();

            isAuthenticated = true;

            const response = NextResponse.next();

            // 🔥 оновлюємо куки якщо сервер повернув нові
            if (data?.accessToken) {
                response.cookies.set('accessToken', data.accessToken);
            }

            if (data?.refreshToken) {
                response.cookies.set('refreshToken', data.refreshToken);
            }

            return response;
        } catch {
            isAuthenticated = false;
        }
    }

    // ❌ не авторизований → редірект
    if (!isAuthenticated && isPrivatePage) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // 🔥 авторизований → НЕ пускаємо на auth сторінки
    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url)); // ✅ ВАЖЛИВО
    }

    return NextResponse.next();
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function proxy(request: NextRequest) {
    const isAuth = request.cookies.get('token');

    const isAuthPage =
        request.nextUrl.pathname.startsWith('/sign-in') ||
        request.nextUrl.pathname.startsWith('/sign-up');

    const isPrivatePage =
        request.nextUrl.pathname.startsWith('/profile') ||
        request.nextUrl.pathname.startsWith('/notes');

    if (!isAuth && isPrivatePage) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (isAuth && isAuthPage) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}
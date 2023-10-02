import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    let authCookie = request.cookies.get('auth');
    if (!authCookie) {
        return returnToLogin(request);
    }

    // TODO verify if the current user have the authorization
    if (true) {
        return NextResponse.next();
    } else {
        return returnToLogin(request);
    }
}

function returnToLogin(request: NextRequest) {
    return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}
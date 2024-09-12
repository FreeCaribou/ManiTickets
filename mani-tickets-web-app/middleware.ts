import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    let authCookie = request.cookies.get('auth');
    if (!authCookie) {
        return returnToLogin(request);
    }

    var decoded;
    try {
        decoded = await jose.jwtVerify(authCookie.value, new TextEncoder().encode(process.env.TOKEN));
    } catch (e) {
        console.log('error', e)
        return returnToLogin(request);
    }

    // TODO verify if the current user have the authorization
    // For the moment we redirect if we see error
    return NextResponse.next();
}

function returnToLogin(request: NextRequest) {
    return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}
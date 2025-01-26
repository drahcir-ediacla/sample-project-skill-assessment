import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Import the correct type for req

export function middleware(req: NextRequest) {
    // Get the auth token from cookies
    const token = req.cookies.get('auth_token')?.value;

    // If the user is authenticated and trying to access `/`, redirect them
    if (token && req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/admin', req.url)); // Redirect to a dashboard or another authenticated path
    }

    // If no token and accessing restricted paths like `/admin`, redirect to login
    if (!token && req.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/', req.url)); // Redirect unauthenticated users to login
    }

    // Proceed to the requested page
    return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
    matcher: ['/', '/admin/:path*'], // Apply middleware to `/` and `/admin/*` paths
};

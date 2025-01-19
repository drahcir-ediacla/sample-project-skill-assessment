import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; // Import the correct type for req

export function middleware(req: NextRequest) {
    // Use `req.cookies` to access cookies
    const token = req.cookies.get('auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // Token is present, proceed to the requested page
    return NextResponse.next();
}

// Define which paths to protect
export const config = {
    matcher: ['/admin/:path*'], // Protect all routes under /admin
};

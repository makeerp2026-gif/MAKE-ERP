import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';

  // Main domain set kar rahe hain (Local vs Production)
  const mainDomain = process.env.NODE_ENV === 'production' ? 'makeerp.com' : 'localhost:3000';

  // Agar URL main domain nahi hai (yani koi subdomain hai jaise raunkschool.makeerp.com)
  if (hostname !== mainDomain && !hostname.includes('vercel.app')) {
    const subdomain = hostname.split('.')[0];
    
    // Traffic ko chupchap /school/[subdomain] wale folder mein bhej do
    return NextResponse.rewrite(new URL(`/school/${subdomain}${url.pathname}`, req.url));
  }

  return NextResponse.next();
}

// Kin pages par yeh police kaam karegi (Images/API par nahi karegi)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
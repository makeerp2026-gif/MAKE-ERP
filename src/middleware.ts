import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // 1. Hostname nikalo aur 'www.' ko hata do taaki confusion na ho
  const hostname = req.headers.get('host') || '';
  const currentHost = hostname.replace('www.', ''); 

  // 2. Define karo ki hamara main domain kya hai
  const isMainDomain = 
    currentHost === 'makeerp.com' || 
    currentHost === 'localhost:3000' || 
    currentHost.includes('vercel.app'); // Vercel ke default URLs ko ignore karo

  // 3. Agar main domain NAHI hai (yani koi school ka subdomain hai)
  if (!isMainDomain) {
    // Subdomain extract karo (e.g., raunkschool.makeerp.com -> 'raunkschool')
    const subdomain = currentHost.split('.')[0];

    // Traffic ko chupchap /school/[subdomain] par bhej do bina URL change kiye
    return NextResponse.rewrite(new URL(`/school/${subdomain}${url.pathname}`, req.url));
  }

  // Agar main domain hai, toh normal page dikhao
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
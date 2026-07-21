import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  
  // 1. Hostname nikaalein (jaise: "dps.makeerp.com" ya "localhost:3000")
  const hostname = req.headers.get('host') || ''
  const currentHost = hostname.split(':')[0] // Port number (3000) hata rahe hain

  // 2. Humare main domains ki list jahan dashboard aur login rahega
  const mainDomains = ['localhost', 'makeerp.com', 'www.makeerp.com']

  // 3. Pata lagayein ki kya yeh Subdomain hai?
  const isSubdomain = !mainDomains.includes(currentHost)

  // 4. Agar Subdomain hai, toh internal routing change karein
  if (isSubdomain) {
    // "dps.makeerp.com" se "dps" nikalenge
    const subdomain = currentHost.replace('.localhost', '').replace('.makeerp.com', '')
    
    // User ko uske specific folder mein bhejenge, lekin browser ka URL wahi rahega!
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url))
  }

  // Agar main domain hai, toh normal chalne do
  return NextResponse.next()
}

// Middleware ko kin files par run nahi karna hai (images, api, css)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
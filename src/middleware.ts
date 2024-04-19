import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import RequestIp from "request-ip";
console.log("this is middleware");
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for");
  console.log("realip", ip);
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};

// See "Matching Paths" below to learn more

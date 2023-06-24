import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const shortUrl = request.url.split("/go/")[1] || "";

  //get the destination url from azure table storage
  const url = new URL(`/api/getUrl?short=${shortUrl}`, request.url);

  const res = await fetch(url);
  const destination: string | null = await res.json();

  if (destination) {
    return NextResponse.redirect(destination);
  }

  return NextResponse.redirect(new URL("/404", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/go/:path*",
};

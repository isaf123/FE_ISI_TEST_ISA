import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;

  if (url.startsWith("/login") && token) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (url.startsWith("/register") && token) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  if (url === "/" && !token) {
    return NextResponse.rewrite(new URL("/login", request.url));
  }
}

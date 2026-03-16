import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")

    const { pathname } = request.nextUrl

    // páginas públicas
    const publicRoutes = ["/login"]

    const isPublic = publicRoutes.includes(pathname)

    // não logado → manda para login
    if (!token && !isPublic) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // logado → não pode ir ao login
    if (token && pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()


}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|form|favicon.ico|portal|documents|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp).*)",
    ],
}
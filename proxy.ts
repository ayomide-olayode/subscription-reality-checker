import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function isPublicPath(pathname: string) {
  // public routes (welcome + auth)
  return (
    // if you have callbacks
    (pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") || pathname.startsWith("/auth"))
  );
}

function isProtectedPath(pathname: string) {
  // everything in the app after auth
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/subscriptions") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/checkins")
  );
}

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getSession();
  const session = data.session;
  const { pathname, search } = req.nextUrl;

  // If user is logged out and tries protected path → redirect to login
  if (!session && isProtectedPath(pathname)) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  // If user is logged in and tries login/signup → redirect to dashboard
  if (session && isPublicPath(pathname) && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
    const dash = req.nextUrl.clone();
    dash.pathname = "/dashboard";
    dash.search = "";
    return NextResponse.redirect(dash);
  }

  return res;
}

export const config = {
  matcher: [
    // run middleware for everything except static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)",
  ],
};

import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register", "/api(.*)"],

  afterAuth: (auth, req) => {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-next-pathname", req.nextUrl.pathname);

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      });
    }

    // Allow users visiting public routes to access them
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"]
};

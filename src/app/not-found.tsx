import Link from "next/link";
import { auth } from "@clerk/nextjs";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  const { userId } = auth();

  return (
    <main className="flex h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="my-8 text-9xl font-semibold">404</h1>
        <h2 className="mb-8 mt-4 text-4xl">Page Not Found</h2>
        <p className="my-2 text-xl font-medium text-foreground">
          We could&apos;t find what you were looking for
        </p>
        <div className="mt-12">
          <Link href={userId ? "/dashboard" : "/"} className="mr-8">
            <Button>{userId ? "Go to dashboard" : "Go to homepage"}</Button>
          </Link>
          <Link
            href="mailto:markbussard@outlook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline">Contact Support</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

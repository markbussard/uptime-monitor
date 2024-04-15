import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { Globe, LineChart, Zap } from "lucide-react";

import { Footer } from "~/components/footer";
import { Button, buttonVariants } from "~/components/ui/button";

export default function Home() {
  const { userId } = auth();

  return (
    <>
      <header className="sticky top-0 z-[1000] border-b border-border/40 bg-background">
        <nav className="flex h-20 items-center justify-center px-8 py-4">
          <div className="container flex max-w-6xl items-center justify-between">
            <Link className="flex flex-row items-center gap-4" href="/">
              <h4 className="text-2xl font-bold">Uptime Monitor</h4>
            </Link>
            <section>
              {userId ? (
                <Link
                  href="/dashboard"
                  className={buttonVariants({ variant: "default" })}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="link" className="text-base">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="ml-4 text-base">Register</Button>
                  </Link>
                </>
              )}
            </section>
          </div>
        </nav>
      </header>
      <main className="flex min-h-screen flex-col">
        <section className="flex flex-col items-center justify-center py-20">
          <h1 className="mb-6 text-5xl font-bold">
            Fast and Reliable Uptime Monitoring
          </h1>
          <p className="mb-8 text-center text-xl">
            Get 30 monitors with 5-minute checks completely free.
            <br />
            No credit card required.
          </p>
          <Link href="/register">
            <Button className="h-[52px] w-52 rounded-full text-lg">
              Get Started
            </Button>
          </Link>
        </section>
        <section className="flex flex-row items-center justify-center gap-10 px-12 py-16">
          <div className="flex h-[164px] max-w-72 flex-col items-center text-center">
            <Zap className="stroke-primary" size={40} />
            <h4 className="mt-4 text-2xl font-bold ">Instant Alerts</h4>
            <p className="mt-2">
              Get notified immediately when your site goes down through email
            </p>
          </div>
          <div className="flex h-[164px] max-w-72 flex-col items-center text-center">
            <LineChart className="stroke-primary" size={40} />
            <h4 className="mt-4 text-2xl font-bold">Performance Metrics</h4>
            <p className="mt-2">
              Track your website&apos;s performance and uptime with detailed
              reports and logs
            </p>
          </div>
          <div className="flex h-[164px] max-w-72 flex-col items-center text-center">
            <Globe className="stroke-primary" size={40} />
            <h4 className="mt-4 text-2xl font-bold">Global Checks</h4>
            <p className="mt-2">
              Ensure worldwide availability with checks from multiple
              geographical locations.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

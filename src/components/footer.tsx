import Link from "next/link";

import { cn } from "~/utils";

interface FooterProps {
  className?: string;
}

export const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "flex h-20 items-center justify-between px-16",
        props.className
      )}
    >
      <p className="text-sm">
        &copy; 2023 Uptime Monitor. All rights reserved.
      </p>
      <section className="flex gap-8">
        <Link className="hover:underline" href="/terms">
          Terms
        </Link>
        <Link className="hover:underline" href="/privacy">
          Privacy
        </Link>
      </section>
    </footer>
  );
};

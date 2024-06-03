"use client";

import { useEffect } from "react";

import { Button } from "~/components/ui/button";

interface RootErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError(props: RootErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error("Error caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center py-12">
      <h1 className="mb-8 text-center text-2xl font-semibold">
        Something went wrong
      </h1>
      <Button onClick={reset} className="mx-auto self-center">
        Try again
      </Button>
    </div>
  );
}

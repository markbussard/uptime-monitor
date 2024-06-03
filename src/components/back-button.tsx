"use client";

import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "./ui/button";

export interface BackButtonProps extends ButtonProps {
  fallbackUrl: string;
}

export const BackButton = (props: BackButtonProps) => {
  const { children, fallbackUrl, ...rest } = props;
  const router = useRouter();

  return (
    <Button
      {...rest}
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackUrl);
        }
      }}
    >
      {children}
    </Button>
  );
};

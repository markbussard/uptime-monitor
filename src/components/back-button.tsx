"use client";

import { useRouter } from "next/navigation";

import { Button, type ButtonProps } from "./ui/button";

export type BackButtonProps = ButtonProps;

export const BackButton = (props: BackButtonProps) => {
  const { children, ...rest } = props;
  const router = useRouter();

  return (
    <Button {...rest} onClick={() => router.back()}>
      {children}
    </Button>
  );
};

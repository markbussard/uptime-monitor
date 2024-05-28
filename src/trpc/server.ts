import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs";

import { createTRPCContext } from "~/server/context";
import { createCaller } from "~/server/root";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
    auth: auth()
  });
});

export const trpc = createCaller(createContext);

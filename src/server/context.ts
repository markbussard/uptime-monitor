import {
  type SignedInAuthObject,
  type SignedOutAuthObject
} from "@clerk/nextjs/server";

import { db } from "./db";

interface CreateInnerTRPCContentOptions {
  auth: SignedInAuthObject | SignedOutAuthObject;
  headers: Headers;
}

export function createInnerTRPCContext(opts: CreateInnerTRPCContentOptions) {
  return {
    db,
    ...opts
  };
}

interface CreateContextOptions {
  headers: Headers;
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export function createTRPCContext(opts: CreateContextOptions) {
  return createInnerTRPCContext({
    auth: opts.auth,
    headers: opts.headers
  });
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

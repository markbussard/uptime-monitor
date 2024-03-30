import { db } from "./db";

export function createInnerTRPCContext() {
  return {
    db
  };
}

interface CreateContextOptions {
  headers: Headers;
}

export function createTRPCContext(opts: CreateContextOptions) {
  const innerContext = createInnerTRPCContext();
  return {
    ...innerContext,
    ...opts
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

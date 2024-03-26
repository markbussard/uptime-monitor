import { monitorRouter } from "~/server/routers/monitor";
import { createCallerFactory, createTRPCRouter } from "~/server/trpc";

export const appRouter = createTRPCRouter({
  monitor: monitorRouter
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);

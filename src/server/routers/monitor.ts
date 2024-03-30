import { createTRPCRouter, protectedProcedure } from "~/server/trpc";

export const monitorRouter = createTRPCRouter({
  list: protectedProcedure.query(() => {
    return {
      message: "Hello, world!"
    };
  })
});

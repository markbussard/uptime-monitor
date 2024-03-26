import { createTRPCRouter, protectedProcedure } from "~/server/trpc";

export const monitorRouter = createTRPCRouter({
  list: protectedProcedure.query(async () => {
    return {
      message: "Hello, world!"
    };
  })
});

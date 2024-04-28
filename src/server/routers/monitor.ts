import { createTRPCRouter, protectedProcedure } from "~/server/trpc";
import { CreateMonitorSchema } from "~/server/validators";

export const monitorRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    const monitors = await ctx.db.monitor.findMany({
      where: {
        userId
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
    return monitors;
  }),
  create: protectedProcedure
    .input(CreateMonitorSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const newMonitor = await ctx.db.monitor.create({
        data: {
          userId,
          ...input
        }
      });
      return newMonitor;
    })
});

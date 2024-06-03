import { TRPCError } from "@trpc/server";

import { createTRPCRouter, protectedProcedure } from "~/server/trpc";
import {
  CreateMonitorSchema,
  GetMonitorByIdSchema,
  UpdateMonitorStatusSchema
} from "~/server/validators";

export const monitorRouter = createTRPCRouter({
  byId: protectedProcedure
    .input(GetMonitorByIdSchema)
    .query(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;

      const monitor = await ctx.db.monitor.findUnique({
        where: {
          id: input.id,
          userId
        },
        include: { incidents: true }
      });

      if (!monitor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Monitor not found"
        });
      }

      const { incidents, ...rest } = monitor;

      const totalDuration =
        (new Date().getTime() - new Date(monitor.createdAt).getTime()) / 1000; // in seconds
      const downtime = incidents.reduce((acc, incident) => {
        if (incident.endTime) {
          return (
            acc +
            (new Date(incident.endTime).getTime() -
              new Date(incident.startTime).getTime()) /
              1000
          );
        }
        return acc;
      }, 0);

      const uptime = totalDuration - downtime;

      return {
        ...rest,
        incidentCount: monitor.incidents.length,
        uptime
      };
    }),
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
    }),
  updateStatus: protectedProcedure
    .input(UpdateMonitorStatusSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.auth.userId;
      const monitor = await ctx.db.monitor.findUnique({
        where: {
          id: input.id,
          userId
        }
      });

      if (!monitor) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Monitor not found"
        });
      }

      const updatedMonitor = await ctx.db.monitor.update({
        where: {
          id: input.id
        },
        data: {
          status: input.status
        }
      });

      return updatedMonitor;
    })
});

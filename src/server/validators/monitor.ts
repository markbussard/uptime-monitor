import { HttpMethodType, MonitorStatus } from "@prisma/client";
import { z } from "zod";

export const CreateMonitorSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Invalid URL" }),
  name: z.string().min(1, { message: "Name is required" }),
  interval: z
    .number()
    .min(10, { message: "Interval is required" })
    .max(600, { message: "Interval is too long" }),
  timeout: z
    .number()
    .min(1, { message: "Timeout is required" })
    .max(60, { message: "Timeout is too long" }),
  httpMethodType: z.nativeEnum(HttpMethodType, {
    required_error: "HTTP Method is required"
  })
});

export type CreateMonitorValues = z.infer<typeof CreateMonitorSchema>;

export const GetMonitorByIdSchema = z.object({
  id: z.string().cuid()
});

export const UpdateMonitorStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.nativeEnum(MonitorStatus, {
    required_error: "Status is required"
  })
});

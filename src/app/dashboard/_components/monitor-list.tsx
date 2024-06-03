"use client";

import Link from "next/link";
import { MonitorStatus } from "@prisma/client";
import { CircleCheck, CirclePause } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~/components/ui/tooltip";
import { trpc } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";
import { formatMonitorInterval } from "~/utils";

interface MonitorListProps {
  initialMonitors: RouterOutputs["monitor"]["list"];
}

const getMonitorIcon = (status: MonitorStatus) => {
  if (status === MonitorStatus.PAUSED) {
    return <CirclePause className="stroke-primary" />;
  }
  return <CircleCheck className="stroke-primary" />;
};

export const MonitorList = (props: MonitorListProps) => {
  const { initialMonitors } = props;

  const monitorListQuery = trpc.monitor.list.useQuery(undefined, {
    initialData: initialMonitors
  });

  return (
    <div>
      {monitorListQuery.data.map((monitor) => {
        const formattedInterval = formatMonitorInterval(monitor.interval);
        return (
          <div
            key={monitor.id}
            className="flex h-16 flex-row items-center gap-4 px-6"
          >
            {getMonitorIcon(monitor.status)}
            <Link
              className="flex w-3/5 flex-col"
              href={`/monitors/${monitor.id}`}
            >
              <p className="text-sm font-semibold">{monitor.url}</p>
              <p className="text-xs">Up 21 day, 1hr</p>
            </Link>

            <div className="w-1/5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-xs">
                    {formattedInterval}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">
                      Checked every {formattedInterval}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        );
      })}
    </div>
  );
};

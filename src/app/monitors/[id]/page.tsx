import { type Metadata } from "next";
import { ChevronLeft } from "lucide-react";

import { BackButton } from "~/components/back-button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { trpc } from "~/trpc/server";
import {
  cn,
  formatMonitorInterval,
  formatMonitorStatus,
  formatMonitorUptime,
  getMonitorStatusColor
} from "~/utils";
import { ActionBar } from "./_components";

interface MetadataProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  props: MetadataProps
): Promise<Metadata> {
  const monitor = await trpc.monitor.byId({ id: props.params.id });

  return {
    title: monitor.name
  };
}

interface MonitorDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MonitorDetailsPage(
  props: MonitorDetailsPageProps
) {
  const monitor = await trpc.monitor.byId({ id: props.params.id });

  return (
    <>
      <BackButton
        variant="ghost"
        size="sm"
        className="-ml-2"
        fallbackUrl="/dashboard"
      >
        <ChevronLeft size={20} className="mr-2" />
        Monitors
      </BackButton>
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">{monitor.name}</h1>
        <div className="flex flex-row items-center">
          <span
            className={cn(
              "text-sm font-medium",
              getMonitorStatusColor(monitor.status)
            )}
          >
            {formatMonitorStatus(monitor.status)}
          </span>
          <span>&nbsp;·&nbsp;</span>
          <span className="text-sm">
            Checked every {formatMonitorInterval(monitor.interval)}
          </span>
        </div>
        <div className="mb-5 mt-10">
          <ActionBar monitorStatus={monitor.status} />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <Card className="flex-1 p-4">
            <CardTitle>Currently up for</CardTitle>
            <CardContent className="mt-2 p-0">
              <p className="flex-1">{formatMonitorUptime(monitor.uptime)}</p>
            </CardContent>
          </Card>
          <Card className="flex-1 p-4">
            <CardTitle>Last checked at</CardTitle>
            <CardContent className="mt-2 p-0">
              <p className="flex-1">{monitor.lastCheck?.toString() ?? ""}</p>
            </CardContent>
          </Card>
          <Card className="flex-1 p-4">
            <CardTitle>Incidents</CardTitle>
            <CardContent className="mt-2 p-0">
              <p className="flex-1">{monitor.incidentCount}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

"use client";

import { useParams, useRouter } from "next/navigation";
import { MonitorStatus } from "@prisma/client";
import { Pause, Play, Settings } from "lucide-react";

import { Button } from "~/components/ui/button";
import { ToastAction } from "~/components/ui/toast";
import { toast } from "~/components/ui/use-toast";
import { trpc } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

interface ActionBarProps {
  monitorStatus: RouterOutputs["monitor"]["byId"]["status"];
}

export const ActionBar = (props: ActionBarProps) => {
  const { monitorStatus } = props;

  const router = useRouter();
  const params = useParams();

  const monitorId = params.id as string;

  const updateMonitorStatusMutation = trpc.monitor.updateStatus.useMutation();

  const updateMonitorStatus = async () => {
    try {
      await updateMonitorStatusMutation.mutateAsync({
        id: monitorId,
        status:
          monitorStatus === MonitorStatus.PAUSED
            ? MonitorStatus.STARTED
            : MonitorStatus.PAUSED
      });
      router.refresh();
    } catch (e: unknown) {
      console.error("Error updating monitor status: ", e);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem updating the monitor status.",
        action: (
          <ToastAction altText="Try again" onClick={updateMonitorStatus}>
            Try again
          </ToastAction>
        )
      });
    }
  };

  return (
    <div className="flex flex-row">
      <Button variant="ghost" size="sm" onClick={updateMonitorStatus}>
        {monitorStatus === MonitorStatus.PAUSED ? (
          <Play size={20} className="mr-2" />
        ) : (
          <Pause size={20} className="mr-2" />
        )}
        {monitorStatus == MonitorStatus.PAUSED ? "Resume" : "Pause"}
      </Button>
      <Button variant="ghost" size="sm">
        <Settings size={20} className="mr-2" />
        Configure
      </Button>
    </div>
  );
};

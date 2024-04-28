import { trpc } from "~/trpc/server";
import { MonitorList } from "./monitor-list";
import { NewMonitorDialog } from "./new-monitor-dialog";

export default async function Dashboard() {
  const monitors = await trpc.monitor.list();

  return (
    <div className="p-12">
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-[calc(100%-200px)] flex-col">
          <div className="mb-4 flex flex-row justify-between">
            <h2 className="text-2xl font-semibold">Monitors</h2>
            <NewMonitorDialog />
          </div>
          <div className="flex flex-col border border-border bg-card text-card-foreground shadow-sm">
            <MonitorList initialMonitors={monitors} />
          </div>
        </div>
        <div className="flex min-w-60 flex-col border border-border bg-card p-4 shadow-sm">
          <h3 className="px-6 pb-4 text-center text-lg font-semibold">
            Global Stats
          </h3>
          <div className="flex flex-row justify-center gap-8 pb-6 text-center">
            <div>
              <p>0</p>
              <p className="text-muted-foreground">Down</p>
            </div>
            <div>
              <p>0</p>
              <p className="text-muted-foreground">Up</p>
            </div>
            <div>
              <p>0</p>
              <p className="text-muted-foreground">Paused</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Using 1 of 50 monitors
          </p>
        </div>
      </div>
    </div>
  );
}

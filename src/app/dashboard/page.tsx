import { trpc } from "~/trpc/server";
import { GlobalStatsCard, MonitorList, NewMonitorDialog } from "./_components";

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
        <GlobalStatsCard />
      </div>
    </div>
  );
}

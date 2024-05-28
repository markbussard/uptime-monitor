export const GlobalStatsCard = () => {
  return (
    <div className="flex h-56 min-w-60 flex-col border border-border bg-card p-4 shadow-sm">
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
  );
};

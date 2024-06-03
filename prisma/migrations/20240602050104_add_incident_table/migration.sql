-- CreateTable
CREATE TABLE "incident" (
    "id" TEXT NOT NULL,
    "monitor_id" TEXT NOT NULL,
    "start_time" TIMESTAMPTZ NOT NULL,
    "end_time" TIMESTAMPTZ,

    CONSTRAINT "incident_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "incident" ADD CONSTRAINT "incident_monitor_id_fkey" FOREIGN KEY ("monitor_id") REFERENCES "monitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

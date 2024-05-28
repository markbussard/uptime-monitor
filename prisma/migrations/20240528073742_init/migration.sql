-- CreateEnum
CREATE TYPE "monitor_status" AS ENUM ('PAUSED', 'STARTED', 'UP', 'DOWN');

-- CreateEnum
CREATE TYPE "http_method_type" AS ENUM ('HEAD', 'GET', 'POST', 'OPTIONS');

-- CreateTable
CREATE TABLE "monitor" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "monitor_status" NOT NULL DEFAULT 'STARTED',
    "url" TEXT NOT NULL,
    "interval" SMALLINT NOT NULL,
    "last_check" TIMESTAMPTZ,
    "timeout" INTEGER NOT NULL DEFAULT 15,
    "http_method_type" "http_method_type" NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "monitor_pkey" PRIMARY KEY ("id")
);

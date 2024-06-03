import { MonitorStatus } from "@prisma/client";

export const formatMonitorStatus = (status: MonitorStatus) => {
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const formatMonitorInterval = (interval: number) => {
  if (interval < 60) return `${interval} seconds`;
  const formattedInterval = Number(interval / 60).toFixed(0);
  return `${Number(interval / 60).toFixed(0)} ${formattedInterval === "1" ? "minute" : "minutes"}`;
};

export const getMonitorStatusColor = (status: MonitorStatus) => {
  switch (status) {
    case MonitorStatus.PAUSED:
      return "text-yellow-500";
    case MonitorStatus.DOWN:
      return "text-red-500";
    case MonitorStatus.UP:
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export const formatMonitorUptime = (uptime: number) => {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (hours >= 24) {
    return `${Math.floor(hours / 24)} days ${hours % 24} hours`;
  } else {
    return `${hours} hours ${minutes} minutes`;
  }
};

import { headers } from "next/headers";
import Link from "next/link";

import { MonitorCheck, NavbarLogo, Radio, Users } from "~/components/icons";
import { cn } from "~/utils";

const navItems = [
  {
    href: "/dashboard",
    title: "Monitors",
    Icon: MonitorCheck
  },
  {
    href: "/status",
    title: "Status Pages",
    Icon: Radio
  },
  {
    href: "/team",
    title: "Team Members",
    Icon: Users
  }
] as const;

export const Sidebar = () => {
  const pathname = headers().get("x-next-pathname");
  return (
    <aside className="flex h-screen w-80 flex-col p-4 text-foreground">
      <div className="mb-4 flex flex-row items-center gap-4 px-6 py-4">
        <NavbarLogo />
        <h1 className="text-2xl font-bold">Uptime Monitor</h1>
      </div>
      <nav className="text-lg">
        <ul>
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <li
                key={`${item.href}-${index}`}
                className={cn(
                  "rounded-md px-6 py-3",
                  isActive && "font-semibold text-primary"
                )}
              >
                <Link href={item.href} className="block text-sm">
                  <item.Icon
                    size={20}
                    className={cn(
                      "mr-4 inline-block stroke-foreground",
                      isActive && "stroke-primary"
                    )}
                  />
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

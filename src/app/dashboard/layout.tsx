import { Sidebar } from "./_components";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="flex w-full flex-1 flex-col overflow-y-auto">
        {props.children}
      </main>
    </div>
  );
}

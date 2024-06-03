import { AppSidebar } from "~/app/_components";

type MonitorDetailsPageLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function MonitorDetailsPageLayout(
  props: MonitorDetailsPageLayoutProps
) {
  return (
    <div className="flex flex-row">
      <AppSidebar />
      <main className="mx-auto w-full max-w-[1040px] px-5 py-2 lg:py-20">
        {props.children}
      </main>
    </div>
  );
}

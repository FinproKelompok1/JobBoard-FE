"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DeveloperSideBar() {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <div className="bg-primary flex h-screen min-w-[290px] flex-col justify-between">
      <nav className="p-5 text-white">
        <Link href={"/developer"}>
          <h1 className="text-2xl font-bold text-white">Developer Dashboard</h1>
        </Link>

        <div className="mt-7 flex flex-col gap-5">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-lg font-bold">Subscription</h1>
            <Link
              href={"/developer/subscription"}
              className={`${isActive("/developer/subscription") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Subscription List
            </Link>
            <Link
              href={"/developer/subscription/create"}
              className={`${isActive("/developer/subscription/create") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Create Subscription
            </Link>
            <Link
              href={"/developer/subscription/edit"}
              className={`${isActive("/developer/subscription/edit") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Edit Subscription
            </Link>
          </div>

          <div className="flex flex-col gap-y-3">
            <h1 className="text-lg font-bold"> Assessment </h1>
            <Link
              href="/developer/assessment"
              className={`${isActive("/developer/assessment") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Assessment List
            </Link>
            <Link
              href={"/developer/assessment/create"}
              className={`${isActive("/developer/assessment/create") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Create Assessment
            </Link>
            <Link
              href={"/developer/assessment/result"}
              className={`${isActive("/developer/assessment/result") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Assessment Result
            </Link>
          </div>

          <div className="flex flex-col gap-y-3">
            <h1 className="text-lg font-bold"> Transaction </h1>
            <Link
              href={"/developer/transaction"}
              className={`${isActive("/developer/transaction") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
            >
              Transaction List
            </Link>
          </div>
        </div>
      </nav>
      <div className="m-5">
        <button className="bg-accent/80 hover:bg-accent rounded-md px-4 py-2 font-semibold text-white/80 transition-all duration-300 ease-in-out hover:text-white">
          Logout
        </button>
      </div>
    </div>
  );
}

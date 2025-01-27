"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function DeveloperSideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);

  const pathname = usePathname();
  const isActive = (path: string): boolean => pathname === path;

  return (
    <>
      <div
        className={`bg-primary fixed bottom-0 left-0 top-0 z-40 flex h-screen min-w-[250px] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-[400px]"
        } `}
      >
        <nav className="flex h-full flex-col justify-between overflow-y-auto p-5 text-white">
          <div>
            <Image
              src={"/logo-title-white.png"}
              alt="logo"
              width={200}
              height={200}
            />
            <Link href={"/developer"}>
              <h1 className="hover:text-accent mt-5 text-xl font-bold text-white">
                Developer Dashboard
              </h1>
            </Link>

            <div className="mt-5 flex flex-col gap-5">
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
          </div>

          <div>
            <button className="bg-accent/90 hover:bg-accent rounded-md px-4 py-2 font-semibold text-white/90 transition-all duration-500 ease-in-out hover:text-white">
              Logout
            </button>
          </div>
        </nav>
      </div>

      <button
        onClick={toggleSideBar}
        className={` ${isSideBarOpen ? "bg-accent" : "bg-primary"} fixed bottom-3 right-3 z-50 flex items-center justify-center rounded-full p-3 text-white shadow-lg md:hidden`}
      >
        {isSideBarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      {isSideBarOpen && (
        <div
          onClick={toggleSideBar}
          className="fixed inset-0 z-30 bg-black/50 opacity-100 backdrop-blur-sm transition-all duration-500 ease-in-out md:hidden"
        ></div>
      )}
    </>
  );
}

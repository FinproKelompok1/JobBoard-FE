"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

export default function DeveloperSideBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  const toggleSideBar = () => setIsSideBarOpen(!isSideBarOpen);
  const pathname = usePathname();
  const isActive = (path: string): boolean => pathname === path;
  const [userH, setUserH] = useState<any | null>(null);

  useEffect(() => {
    const checkUserCookie = () => {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));

      if (userCookie) {
        const userData = userCookie.split("=")[1];
        try {
          setUserH(JSON.parse(userData));
        } catch (e) {
          console.error("Error parsing user cookie:", e);
        }
      } else {
        setUserH(null);
      }
    };

    checkUserCookie();

    const interval = setInterval(checkUserCookie, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogOut = () => {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = "/";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUserH(null);
    window.location.href = "/";
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 top-0 z-40 flex min-h-screen min-w-fit bg-primary transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-[400px]"
        } `}
      >
        <nav className="flex h-full flex-col justify-between overflow-y-auto p-5 text-white">
          <div>
            <Image
              src={
                "https://res.cloudinary.com/difaukz1b/image/upload/v1739765828/logo/a8bmafj8reccjcniaswh.png"
              }
              alt="logo"
              width={200}
              height={200}
              priority
              className="h-auto w-full max-w-52"
            />
            <Link href={"/developer"}>
              <h1 className="mt-10 text-lg font-bold text-white hover:text-accent">
                Developer Dashboard
              </h1>
            </Link>

            <div className="mt-5 flex flex-col gap-5">
              <div className="flex flex-col gap-y-3">
                <Link
                  href={"/developer/subscription"}
                  className={`${isActive("/developer/subscription") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
                >
                  Subscription
                </Link>
              </div>

              <div className="flex flex-col gap-y-3">
                <Link
                  href="/developer/assessment"
                  className={`${isActive("/developer/assessment") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
                >
                  Assessment
                </Link>
              </div>

              <div className="flex flex-col gap-y-3">
                <Link
                  href={"/developer/transaction"}
                  className={`${isActive("/developer/transaction") ? "dashboard-sidebar-button-active" : "dashboard-sidebar-button"}`}
                >
                  Transaction
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-5 mt-10">
            <button
              onClick={handleLogOut}
              className="w-full rounded-md bg-accent px-4 py-2 font-semibold text-white transition-all duration-500 ease-in-out hover:bg-accent/80"
            >
              Log out
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

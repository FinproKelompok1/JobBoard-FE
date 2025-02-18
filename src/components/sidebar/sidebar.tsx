"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiHome4Fill } from "react-icons/ri";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PiSignOutFill } from "react-icons/pi";

export default function Sidebar() {
  const [SidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [contentOpen, setContentOpen] = useState<boolean>(true);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen);

    if (!contentOpen) {
      setTimeout(() => {
        setContentOpen(!contentOpen);
      }, 80);
    } else setContentOpen(!contentOpen);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`sidebar tablet:flex sticky top-0 hidden h-screen flex-col overflow-hidden border-r bg-blueNavy py-4 text-white transition-all duration-150 ${SidebarOpen ? "min-w-[250px]" : "min-w-[50px]"}`}
    >
      <div className="mb-4 flex justify-center">
        <Link href={"/admin/dashboard"}>
          {contentOpen ? (
            <Image
              src="/logo-title-white.png"
              alt="TalentBridge"
              className="w-44"
              width={250}
              height={250}
            />
          ) : (
            <Image
              src="/favico-white.png"
              alt="TalentBridge"
              width={40}
              height={40}
            />
          )}
        </Link>
      </div>

      {/* menu sidebar */}
      <div className="grow">
        <div className="mb-4 flex flex-col">
          <h1
            className={`ml-4 mt-2 text-xs font-semibold ${!contentOpen && "m-0 hidden"}`}
          >
            Dashboard
          </h1>
          <Link className="my-1" href={"/admin/dashboard"}>
            <div
              className={`flex items-center py-2 pl-2 transition-all hover:pl-4 ${isActive("/admin/dashboard") && "bg-lightBlue pl-4"}`}
            >
              <RiHome4Fill className="text-[20px]" />
              <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>
                Dashboard
              </p>
            </div>
          </Link>

          <Link className="my-1" href={"/admin/job"}>
            <div
              className={`flex items-center py-2 pl-2 transition-all hover:pl-4 ${isActive("/admin/job") ? "bg-lightBlue pl-4" : ""}`}
            >
              <FaFileAlt className="text-[20px]" />
              <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>Jobs</p>
            </div>
          </Link>

          <Link className="my-1" href={"/admin/create-job"}>
            <div
              className={`flex items-center py-2 pl-2 transition-all hover:pl-4 ${isActive("/admin/create-job") ? "bg-lightBlue pl-4" : ""}`}
            >
              <FaPencil className="text-[20px]" />
              <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>
                Create Job
              </p>
            </div>
          </Link>
        </div>
        <div className="mb-4 flex flex-col">
          <h1
            className={`ml-4 text-xs font-semibold ${!contentOpen && "m-0 hidden"}`}
          >
            Account
          </h1>
          <Link className="my-1" href={"/admin/profile"}>
            <div
              className={`flex items-center py-2 pl-2 transition-all hover:pl-4 ${isActive("/admin/profile") ? "bg-lightBlue pl-4" : ""}`}
            >
              <FaUser className="text-[20px]" />
              <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>Profile</p>
            </div>
          </Link>
          <Link className="my-1" href={"/admin/profile"}>
            <div
              className={`flex items-center py-2 pl-2 transition-all hover:bg-red-500`}
            >
              <PiSignOutFill className="text-[20px]" />
              <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>Log out</p>
            </div>
          </Link>
        </div>
      </div>

      <div
        className="flex cursor-pointer items-center px-2"
        onClick={toggleSidebar}
      >
        {contentOpen ? (
          <IoIosArrowBack className="text-[20px]" />
        ) : (
          <IoIosArrowForward className="text-[20px]" />
        )}
        <p className={`ml-2 ${!contentOpen && "m-0 hidden"}`}>
          Singkat Sidebar
        </p>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import { RiHome4Fill } from "react-icons/ri";
import { FaPencil, FaUserTie } from "react-icons/fa6";
import UseOpen from "@/hooks/useOpen";
import { PiSignOutFill } from "react-icons/pi";
import logOut from "@/helpers/logout";
import { useEffect, useState } from "react";
import { IUser } from "@/types/user";
import Image from "next/image";

export default function MobileNav() {
  const { open, hidden, menuHandler } = UseOpen();
  const [userH, setUserH] = useState<IUser | null>(null);

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
  }, [])

  return (
    <div className='relative flex justify-between border-b items-center py-2 px-4 tablet:hidden'>
      <h1 className='text-2xl font-semibold'>Employer</h1>
      <div className="flex items-center gap-2">
        <div className="sm:flex flex-col text-end hidden">
          <p>{userH?.email}</p>
          <p className="text-xs font-semibold text-black/50">{userH?.companyName}</p>
        </div>
        <button
          onClick={menuHandler}
          className="w-[35px] h-[35px] rounded-full cursor-pointer relative"
        >
          <Image
            className="rounded-full object-cover"
            src={userH?.logo || 'https://res.cloudinary.com/dozmme9hc/image/upload/v1734232945/Default_idtsln.png'}
            alt={userH?.companyName || "Admin Company"}
            fill
            priority
          />
        </button>
        <div
          className={`overflow-hidden rounded-md absolute w-56 md:w-64 shadow-lg border font-semibold z-10 bg-white text-black right-10 top-[2.5rem] flex flex-col transition duration-300 ${open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
            } ${hidden ? "" : "hidden"}`}
        >
          <div className="border-b p-3 sm:hidden">
            <p>{userH?.companyName}</p>
            <p className="text-xs text-black/50 font-semibold">{userH?.email}</p>
          </div>
          <Link href={"/admin/dashboard"} className="flex items-center hover:bg-black/10 p-3" >
            <RiHome4Fill className='text-[20px]' />
            <p className="ml-2">Dashboard</p>
          </Link>
          <Link href={"/admin/job"} className="flex items-center hover:bg-black/10 p-3" >
            <FaFileAlt className='text-[20px]' />
            <p className="ml-2">Jobs</p>
          </Link>
          <Link href={"/create-job"} className="flex items-center hover:bg-black/10 p-3" >
            <FaPencil className='text-[20px]' />
            <p className="ml-2">Create Job</p>
          </Link>
          <Link href={"/admin/profile"} className="flex items-center hover:bg-black/10 p-3" >
            <FaUserTie className='text-[20px]' />
            <p className="ml-2">Profile</p>
          </Link>
          <div className="border-t">
            <Link
              href={"#"}
              className="flex items-center text-red-500 font-semibold hover:bg-red-500 p-3 hover:text-white"
              onClick={logOut}
            >
              <PiSignOutFill className='text-[20px]' />
              <p className="ml-2">Log out</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

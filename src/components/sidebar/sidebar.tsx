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
  const [SidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [contentOpen, setContentOpen] = useState<boolean>(true)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!SidebarOpen);

    if (!contentOpen) {
      setTimeout(() => {
        setContentOpen(!contentOpen)
      }, 80)
    } else setContentOpen(!contentOpen)
  };

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`sidebar sticky top-0 hidden flex-col h-screen overflow-hidden border-r py-4 transition-all duration-150 tablet:flex bg-blueNavy text-white ${SidebarOpen ? 'min-w-[250px]' : 'min-w-[50px]'}`}>
      <div className="flex justify-center mb-4">
        <Link href={"/admin/dashboard"}>
          {contentOpen ? (
            <Image src='/logo-title-white.png' alt="TalentBridge" className="w-44" width={250} height={250} />
          ) : (
            <Image src='/favico-white.png' alt="TalentBridge" width={40} height={40} />
          )}
        </Link>
      </div>

      {/* menu sidebar */}
      <div className="grow">
        <div className='flex flex-col mb-4'>
          <h1
            className={`ml-4 mt-2 text-xs font-semibold ${!contentOpen && 'hidden m-0'}`}
          >
            Dashboard
          </h1>
          <Link className='my-1' href={"/admin/dashboard"}>
            <div className={`flex items-center py-2 transition-all pl-2 hover:pl-4 ${isActive('/admin/dashboard') && 'bg-lightBlue pl-4'}`}>
              <RiHome4Fill className='text-[20px]' />
              <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
                Dashboard
              </p>
            </div>
          </Link>

          <Link className='my-1' href={"/admin/job"}>
            <div className={`flex items-center py-2 transition-all pl-2 hover:pl-4 ${isActive('/admin/job') ? 'bg-lightBlue pl-4' : ''}`}>
              <FaFileAlt className='text-[20px]' />
              <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
                Jobs
              </p>
            </div>
          </Link>

          <Link className='my-1' href={"/admin/create-job"}>
            <div className={`flex items-center py-2 transition-all pl-2 hover:pl-4 ${isActive('/admin/create-job') ? 'bg-lightBlue pl-4' : ''}`}>
              <FaPencil className='text-[20px]' />
              <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
                Create Job
              </p>
            </div>
          </Link>

        </div>
        <div className='flex flex-col mb-4'>
          <h1
            className={`ml-4 text-xs font-semibold ${!contentOpen && 'hidden m-0'}`}
          >
            Account
          </h1>
          <Link className='my-1' href={"/admin/profile"}>
            <div className={`flex items-center py-2 transition-all pl-2 hover:pl-4 ${isActive('/admin/profile') ? 'bg-lightBlue pl-4' : ''}`}>
              <FaUser className='text-[20px]' />
              <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
                Profile
              </p>
            </div>
          </Link>
          <Link className='my-1' href={"/admin/profile"}>
            <div className={`flex items-center py-2 transition-all pl-2 hover:bg-red-500`}>
              <PiSignOutFill className='text-[20px]' />
              <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
                Log out
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className='flex items-center cursor-pointer px-2' onClick={toggleSidebar}>
        {contentOpen ? (
          <IoIosArrowBack className='text-[20px]' />
        ) : (
          <IoIosArrowForward className='text-[20px]' />
        )}
        <p className={`ml-2 ${!contentOpen && 'hidden m-0'}`}>
          Singkat Sidebar
        </p>
      </div>
    </nav>
  );
}

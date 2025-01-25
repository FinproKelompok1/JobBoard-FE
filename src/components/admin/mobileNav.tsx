"use client";

import Link from "next/link";
import dashNavbar from "@/components/sidebar/content/dashNavbar.module.css";
import side from "@/components/sidebar/sidebar.module.css";
import { FaFileAlt } from "react-icons/fa";
import { RiHome4Fill } from "react-icons/ri";
import { FaPencil, FaUserTie } from "react-icons/fa6";
// import { logOut } from "@/libs/action";
// import useSessionOrganizer from "@/hooks/useSessionOrganiser";
// import UseClickOutside from "@/hooks/useClickOutside";
import UseOpen from "@/hooks/useOpen";
// import Image from "next/image";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const { open, hidden, menuHandler } = UseOpen();
  // UseClickOutside(open, menuHandler);
  // const { organizer } = useSessionOrganizer();
  const pathname = usePathname()
  const namePage = pathname.split('/').pop()

  // const onLogout = () => {
  //   logOut("token");
  //   location.reload();
  // };

  return (
    <div className={dashNavbar.dashboardNavbar}>
      <h1 className={dashNavbar.titleNavbar}>
        <span className="hidden sm:inline-block mr-2">Organizer</span>
        <span>{namePage && `${namePage[0].toUpperCase()}${namePage.slice(1)}`}</span>
      </h1>
      <div className="flex items-center gap-2">
        {/* <div className="sm:flex flex-col text-end hidden">
          <p className="font-bold">{organizer?.name}</p>
          <p>{organizer?.email}</p>
        </div> */}
        <button
          onClick={menuHandler}
          className="w-[35px] h-[35px] rounded-full cursor-pointer relative bg-yellow-200"
        >
          {/* <Image
            className="rounded-full object-cover"
            src={organizer?.avatar || ''}
            alt={organizer?.name || "organizer"}
            fill
            priority
          /> */}
        </button>
      </div>
      <div
        className={`rounded-md absolute w-64 shadow-lg border font-semibold z-10 bg-white text-black right-10 top-[4.3rem] flex flex-col transition duration-300 ${open ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          } ${hidden ? "" : "hidden"}`}
      >
        {/* <div className="border-b p-3 sm:hidden">
          <p className="font-bold">{organizer?.name}</p>
          <p>{organizer?.email}</p>
        </div> */}
        <Link href={"/organizer/dashboard"} className="flex items-center hover:bg-black/10 p-3" >
          <RiHome4Fill className={side.icons} />
          <p className="ml-2">Dashboard</p>
        </Link>
        <Link href={"/organizer/events"} className="flex items-center hover:bg-black/10 p-3" >
          <FaFileAlt className={side.icons} />
          <p className="ml-2">Event Saya</p>
        </Link>
        <Link href={"/create-event"} className="flex items-center hover:bg-black/10 p-3" >
          <FaPencil className={side.icons} />
          <p className="ml-2">Buat Event</p>
        </Link>
        <Link href={"/organizer/bio"} className="flex items-center hover:bg-black/10 p-3" >
          <FaUserTie className={side.icons} />
          <p className="ml-2">Informasi Dasar</p>
        </Link>
        {/* <Link
          href={"#"}
          className="text-red-500 font-semibold hover:bg-red-600/10 p-3"
          onClick={onLogout}
        >
          Logout
        </Link> */}
      </div>
    </div>
  );
}

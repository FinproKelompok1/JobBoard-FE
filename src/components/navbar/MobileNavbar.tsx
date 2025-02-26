import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./navlink";
import Link from "next/link";
import Image from "next/image";

interface UserType {
  role: "admin" | "developer" | "user" | string;
}

interface MobileNavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userH: UserType | null;
  logOut: () => void;
}

export default function MobileNavbar({
  isOpen,
  setIsOpen,
  userH,
  logOut
}: MobileNavbarProps) {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-title-colored.png"
            alt="TalentBridge Logo"
            width={144}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#0D3880]"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col space-y-4 pb-4">
          <NavLinks isHomePage={false} isScrolled={true} />
          <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
            {!userH ? (
              <>
                <a
                  href="/auth/login"
                  className="font-medium text-[#0D3880] transition-colors hover:text-[#E60278]"
                >
                  LOGIN
                </a>
                <a
                  href="/auth/register"
                  className="rounded-lg bg-[#E60278] px-4 py-2 text-center font-medium text-white transition-all hover:bg-[#E60278]/90"
                >
                  REGISTER
                </a>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                {(userH.role === "admin" || userH.role === "developer") && (
                  <a
                    href={
                      userH.role === "admin"
                        ? "/admin/dashboard"
                        : "/developer"
                    }
                    className="font-medium text-[#0D3880] transition-colors hover:text-[#E60278]"
                  >
                    Dashboard
                  </a>
                )}
                {(userH.role === "admin" || userH.role === "user") && (
                  <a
                    href={
                      userH.role === "admin" ? "/admin/profile" : "/profile"
                    }
                    className="font-medium text-[#0D3880] transition-colors hover:text-[#E60278]"
                  >
                    Profile
                  </a>
                )}
                <button
                  onClick={logOut}
                  className="rounded-lg bg-[#E60278] px-4 py-2 text-center font-medium text-white transition-all hover:bg-[#E60278]/90"
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
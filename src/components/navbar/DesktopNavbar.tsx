import React from "react";
import NavLinks from "./navlink";
import Link from "next/link";
import Image from "next/image";

interface User {
  role: string;
  username: string;
  profilePicture?: string;
  companyName?: string;
}

interface DesktopNavbarProps {
  isHomePage: boolean;
  isScrolled: boolean;
  userH: User | null;
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
}

export default function DesktopNavbar({
  isHomePage,
  isScrolled,
  userH,
  showProfileMenu,
  setShowProfileMenu,
  logOut,
}: DesktopNavbarProps) {
  const desktopTextColor = isHomePage
    ? isScrolled
      ? "text-[#0D3880]"
      : "text-[#FFFFFF]"
    : "text-[#0D3880]";

  return (
    <div className="hidden items-center justify-between md:flex">
      <Link href="/" className="flex items-center">
        <Image
          src={
            isHomePage && !isScrolled
              ? "/logo-title-white.png"
              : "/logo-title-colored.png"
          }
          alt="TalentBridge Logo"
          width={144}
          height={48}
          className="h-12 w-auto"
          priority
        />
      </Link>

      <div className="flex items-center space-x-8">
        <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
        <div className="flex items-center gap-4">
          {!userH ? (
            <>
              <a
                href="/auth/login"
                className={`font-medium transition-colors hover:text-[#E60278] ${desktopTextColor}`}
              >
                LOGIN
              </a>
              <a
                href="/auth/register"
                className={`rounded-lg px-4 py-2 font-medium transition-all ${
                  isHomePage && !isScrolled
                    ? "bg-white text-[#0D3880] hover:bg-white/90"
                    : "bg-[#E60278] text-white hover:bg-[#E60278]/90"
                }`}
              >
                REGISTER
              </a>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                  {userH.profilePicture ? (
                    <Image
                      src={userH.profilePicture}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className={`flex h-full w-full items-center justify-center ${desktopTextColor}`}
                    >
                      {userH.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                </div>
                <span className={`font-medium ${desktopTextColor}`}>
                  {userH?.companyName ?? userH?.username ?? "admin"}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {(userH.role === "admin" || userH.role === "developer") && (
                      <a
                        href={userH.role === "admin" ? "/admin/dashboard" : "/developer"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    )}
                    {(userH.role === "admin" || userH.role === "user") && (
                      <a
                        href={userH.role === "admin" ? "/admin/profile" : "/profile"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Profile
                      </a>
                    )}
                    {userH.role === "user" && (
                      <>
                        <a
                          href={`/subscription/${userH.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Subscription
                        </a>
                        <a
                          href={`/transaction/${userH.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Transaction
                        </a>
                        <a
                          href={`/assessment/${userH.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Assessment
                        </a>
                        <a
                          href={`/review/${userH.username}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Review
                        </a>
                      </>
                    )}
                    <button
                      onClick={logOut}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
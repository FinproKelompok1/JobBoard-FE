"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import NavLinks from "./navlink";
import Link from "next/link";
import useCookie from "@/hooks/useCookie";

interface NavbarProps {
  isHomePage: boolean;
}

export default function Navbar({ isHomePage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userH, setUserH] = useState<any | null>(null);
  const user = useCookie("user");

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

  useEffect(() => {
    if (user) {
      try {
        setUserH(JSON.parse(user));
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    window.location.href = "/";
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUserH(null);
    window.location.href = "/";
  };

  const bgColor = isHomePage
    ? isScrolled
      ? "bg-[#FFFFFF] shadow-lg"
      : "bg-transparent"
    : "bg-[#FFFFFF] shadow-lg";

  const textColor = isHomePage
    ? isScrolled
      ? "text-[#0D3880]"
      : "text-[#FFFFFF]"
    : "text-[#0D3880]";

  const renderProfileMenu = () => {
    if (!userH) return null;

    const isAdmin = userH.role === "admin";
    const isUser = userH.role === "user";
    const isDeveloper = userH.role === "developer";

    return (
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
            {userH.profilePicture ? (
              <img
                src={userH.profilePicture}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center ${textColor}`}
              >
                {userH.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
          <span className={`font-medium ${textColor}`}>
            {userH?.companyName ?? userH?.username ?? "developer"}
          </span>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              {(isAdmin || isUser) && (
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Profile
                </a>
              )}
              {isUser && (
                <Link
                  href={`/${userH.username}/subscription`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Subscription
                </Link>
              )}
              <button
                onClick={logOut}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${bgColor}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src={
                isHomePage && !isScrolled
                  ? "/logo-title-white.png"
                  : "/logo-title-colored.png"
              }
              alt="TalentBridge Logo"
              className="h-12"
            />
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
            <div className="flex items-center gap-4">
              {!userH ? (
                <>
                  <a
                    href="/auth/login"
                    className={`font-medium transition-colors hover:text-[#E60278] ${textColor}`}
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
                renderProfileMenu()
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColor}`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="mt-4 flex flex-col space-y-4 pb-4 md:hidden">
            <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
            <div className="flex flex-col gap-4 border-t border-white/10 pt-4">
              {!userH ? (
                <>
                  <a
                    href="/auth/login"
                    className={`font-medium transition-colors hover:text-[#E60278] ${textColor}`}
                  >
                    LOGIN
                  </a>
                  <a
                    href="/auth/register"
                    className={`rounded-lg px-4 py-2 text-center font-medium transition-all ${
                      isHomePage && !isScrolled
                        ? "bg-white text-[#0D3880] hover:bg-white/90"
                        : "bg-[#E60278] text-white hover:bg-[#E60278]/90"
                    }`}
                  >
                    REGISTER
                  </a>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  {(userH.role === "admin" || userH.role === "user") && (
                    <a
                      href="/profile"
                      className={`font-medium transition-colors hover:text-[#E60278] ${textColor}`}
                    >
                      Profile
                    </a>
                  )}
                  <button
                    onClick={logOut}
                    className={`rounded-lg px-4 py-2 text-center font-medium transition-all ${
                      isHomePage && !isScrolled
                        ? "bg-white text-[#0D3880] hover:bg-white/90"
                        : "bg-[#E60278] text-white hover:bg-[#E60278]/90"
                    }`}
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import useCookie from "@/hooks/useCookie";
import { IUser } from "@/types/user";

interface NavbarProps {
  isHomePage: boolean;
}

export default function Navbar({ isHomePage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userH, setUserH] = useState<IUser | null>(null);
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
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    setUserH(null);
    window.location.href = "/";
  };

  const desktopBgClass = isHomePage && !isScrolled 
    ? "md:bg-transparent md:shadow-none" 
    : "md:bg-[#FFFFFF] md:shadow-lg";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 bg-[#FFFFFF] shadow-lg ${desktopBgClass}`}
    >
      <div className="container mx-auto px-6 py-4">
        <MobileNavbar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userH={userH}
          logOut={logOut}
        />
        
        <DesktopNavbar
          isHomePage={isHomePage}
          isScrolled={isScrolled}
          userH={userH}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          logOut={logOut}
        />
      </div>
    </nav>
  );
}

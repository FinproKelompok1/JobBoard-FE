"use client";
import React from "react";

interface NavLinksProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export default function NavLinks({ isHomePage, isScrolled }: NavLinksProps) {
  const navigationItems = [
    { label: "SUBSCRIPTION", path: "/subscription" },
    { label: "FIND GREAT JOBS", path: "/jobs" },
    { label: "FIND TOP EMPLOYERS", path: "/companies" },
    { label: "ABOUT US", path: "/about-us" },
  ];

  const textColor = isHomePage
    ? isScrolled
      ? "text-[#0D3880]"
      : "text-[#FFFFFF]"
    : "text-[#0D3880]";

  return navigationItems.map(({ label, path }) => (
    <a
      key={label}
      href={path}
      className={`font-medium transition-colors hover:text-[#E60278] ${textColor}`}
    >
      {label}
    </a>
  ));
}

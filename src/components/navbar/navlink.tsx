'use client'
import React from 'react';

interface NavLinksProps {
  isHomePage: boolean;
  isScrolled: boolean;
}

export default function NavLinks({ isHomePage, isScrolled }: NavLinksProps) {
  const navigationItems = [
    { label: 'FIND GREAT JOBS', path: '/jobs' },
    { label: 'FIND TOP EMPLOYERS', path: '/companies' },
    { label: 'ABOUT US', path: '/about-us' }
  ];

  // If not homepage, always use dark text
  const textColor = isHomePage
    ? (isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]')
    : 'text-[#0D3880]';

  return (
    navigationItems.map(({ label, path }) => (
      <a
        key={label}
        href={path}
        className={`font-medium hover:text-[#E60278] transition-colors ${textColor}`}
      >
        {label}
      </a>
    ))
  );
}
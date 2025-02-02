'use client'
import React from 'react';

interface NavLinksProps {
  isScrolled: boolean;
}

export default function NavLinks({ isScrolled }: NavLinksProps) {
  return (
    ['FIND GREAT JOBS', 'ABOUT US', 'CONTACT US'].map((item) => (
      <a
        key={item}
        href="#"
        className={`font-medium hover:text-[#E60278] transition-colors ${
          isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]'
        }`}
      >
        {item}
      </a>
    ))
  );
}
'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './navlink';
import Link from 'next/link';

interface NavbarProps {
  isHomePage: boolean;
}

export default function Navbar({ isHomePage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bgColor = isHomePage 
    ? (isScrolled ? 'bg-[#FFFFFF] shadow-lg' : 'bg-transparent')
    : 'bg-[#FFFFFF] shadow-lg';

  const textColor = isHomePage
    ? (isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]')
    : 'text-[#0D3880]';

  return (
    <nav className={`fixed top-0 left-0 right-0 transition-all duration-300 z-50 ${bgColor}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src={isHomePage && !isScrolled ? "/logo-title-white.png" : "/logo-title-colored.png"}
              alt="TalentBridge Logo" 
              className="h-12" 
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
            <div className="flex items-center gap-4">
              <a
                href="/auth/login"
                className={`font-medium hover:text-[#E60278] transition-colors ${textColor}`}
              >
                LOGIN
              </a>
              <a
                href="/auth/register"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isHomePage && !isScrolled
                    ? 'bg-white text-[#0D3880] hover:bg-white/90'
                    : 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
                }`}
              >
                REGISTER
              </a>
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
          <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <a
                href="/auth/login"
                className={`font-medium hover:text-[#E60278] transition-colors ${textColor}`}
              >
                LOGIN
              </a>
              <a
                href="/auth/register"
                className={`px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  isHomePage && !isScrolled
                    ? 'bg-white text-[#0D3880] hover:bg-white/90'
                    : 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
                }`}
              >
                REGISTER
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
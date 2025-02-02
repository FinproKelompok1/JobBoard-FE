'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './navlink';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full transition-all duration-300 z-50 ${
      isScrolled ? 'bg-[#FFFFFF] shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isScrolled ? (
              <img 
                src="/logo-title-colored.png" 
                alt="TalentBridge Logo" 
                className="h-12" 
              />
            ) : (
              <div className="flex items-center">
                <img 
                  src="/logo-title-white.png" 
                  alt="TalentBridge Logo" 
                  className="h-12" 
                />
              </div>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} />
            <div className="flex items-center gap-4">
              <a
                href="/login"
                className={`font-medium hover:text-[#E60278] transition-colors ${
                  isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]'
                }`}
              >
                Login
              </a>
              <a
                href="/register"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isScrolled 
                    ? 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
                    : 'bg-white text-[#0D3880] hover:bg-white/90'
                }`}
              >
                Register
              </a>
            </div>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`md:hidden ${isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]'}`}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <NavLinks isScrolled={isScrolled} />
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <a
                href="/login"
                className={`font-medium hover:text-[#E60278] transition-colors ${
                  isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]'
                }`}
              >
                Login
              </a>
              <a
                href="/register"
                className={`px-4 py-2 rounded-lg font-medium text-center transition-all ${
                  isScrolled 
                    ? 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
                    : 'bg-white text-[#0D3880] hover:bg-white/90'
                }`}
              >
                Register
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
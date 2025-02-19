'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import NavLinks from './navlink';
import Link from 'next/link';
import useCookie from '@/hooks/useCookie';

interface NavbarProps {
  isHomePage: boolean;
}

export default function Navbar({ isHomePage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userH, setUserH] = useState<any | null>(null);
  const user = useCookie('user');

  useEffect(() => {
    if (user) {
      setUserH(JSON.parse(user));
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logOut = () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    window.location.href = '/';
  };

  const bgColor = isHomePage 
    ? (isScrolled ? 'bg-[#FFFFFF] shadow-lg' : 'bg-transparent')
    : 'bg-[#FFFFFF] shadow-lg';

  const textColor = isHomePage
    ? (isScrolled ? 'text-[#0D3880]' : 'text-[#FFFFFF]')
    : 'text-[#0D3880]';

  const renderProfileMenu = () => {
    if (!userH) return null;

    const isAdmin = userH.role === 'admin';
    const isUser = userH.role === 'user';
    const isDeveloper = userH.role === 'developer';

    return (
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
            {userH.profilePicture ? (
              <img
                src={userH.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${textColor}`}>
                {userH.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <span className={`font-medium ${textColor}`}>
            {userH?.companyName ?? userH?.username ?? 'admin'}
          </span>
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
              <button
                onClick={logOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
              {!userH ? (
                <>
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
          <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <NavLinks isHomePage={isHomePage} isScrolled={isScrolled} />
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              {!userH ? (
                <>
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
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  {(userH.role === 'admin' || userH.role === 'user') && (
                    <a
                      href="/profile"
                      className={`font-medium hover:text-[#E60278] transition-colors ${textColor}`}
                    >
                      Profile
                    </a>
                  )}
                  <button
                    onClick={logOut}
                    className={`px-4 py-2 rounded-lg font-medium text-center transition-all ${
                      isHomePage && !isScrolled
                        ? 'bg-white text-[#0D3880] hover:bg-white/90'
                        : 'bg-[#E60278] text-white hover:bg-[#E60278]/90'
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
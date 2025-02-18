'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  

  const shouldShowNavbar = () => {
    if (pathname === '/') return true;
    
    const userRoutes = [
      '/jobs',
      '/companies',
      '/companies-detail',
      '/jobs-detail',
      '/profile',
      '/subscription',
      '/apply-job',
        '/transaction',
        '/about-us',
      '/auth/register',
      '/auth/login'
    ];

    return userRoutes.some(route => pathname.startsWith(route));
  };

  const isHomePage = pathname === '/';

  if (!shouldShowNavbar()) {
    return null;
  }

  return (
    <>
      <Navbar isHomePage={isHomePage} />
      {!isHomePage && <div className="h-20" />} 
    </>
  );
}
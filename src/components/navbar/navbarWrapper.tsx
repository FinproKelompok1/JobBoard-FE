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
      '/job-detail',
      '/profile',
      '/subscription',
      '/apply-job',
      '/transaction',
      '/about-us',
      '/contact',
      '/auth/register',
      '/auth/login',
      '/auth/forgot-password',
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
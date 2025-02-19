'use client'
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from './footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  
  const shouldShowFooter = () => {
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
      '/auth/register',
      '/auth/login'
    ];

    return userRoutes.some(route => pathname.startsWith(route));
  };

  if (!shouldShowFooter()) {
    return null;
  }

  return <Footer />;
}
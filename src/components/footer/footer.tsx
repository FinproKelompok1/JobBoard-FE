'use client'
import React from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  GraduationCap,
  Rocket,
  Users,
  MessageCircle
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#0D3880] text-white py-8">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img
              src="/logo-title-white.png"
              alt="TalentBridge Logo"
              className="h-10"
            />
            <p className="text-sm text-gray-300 font-light">
              Transforming careers, building futures.
              We connect extraordinary talent with visionary companies.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Link href="/jobs"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Briefcase className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">Find Jobs</h3>
              <p className="text-xs text-gray-400">Explore jobs</p>
            </Link>

            <Link href="/companies"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Building2 className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">Companies</h3>
              <p className="text-xs text-gray-400">Top employers</p>
            </Link>

            <Link href="/auth/register"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Users className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">Profile</h3>
              <p className="text-xs text-gray-400">Build CV</p>
            </Link>

            <Link href="/subscription"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <Rocket className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">Premium</h3>
              <p className="text-xs text-gray-400">Get more</p>
            </Link>

            <Link href="/about-us"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <GraduationCap className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">About Us</h3>
              <p className="text-xs text-gray-400">Our mission</p>
            </Link>

            <Link href="#"
              className="group p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 text-[#E60278] group-hover:scale-110 transition-transform duration-300" />
              <h3 className="mt-2 text-sm font-medium">Support</h3>
              <p className="text-xs text-gray-400">Get help</p>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} TalentBridge. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-gray-400">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
'use client'

import React from 'react';
import Image from 'next/image';
import JobFilter from './filter';

export default function Hero() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/hero.jpg"
            alt="Professional working"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[#000000]/60" />
      </div>
      
      <div className="relative z-10 px-4 py-24 max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
        <div className="mb-12">
          <p className="text-[#FFFFFF]/90 text-xl mb-4">For job seekers and job employer</p>
          
          <h1 className="text-5xl md:text-7xl font-bold text-[#FFFFFF] mb-6">
            Your career journey<br />starts here
          </h1>
          
          <p className="text-[#FFFFFF]/90 text-xl md:text-2xl mb-4">Bridging Dreams to Reality</p>
          
          <p className="text-[#FFFFFF]/90 text-lg md:text-xl max-w-2xl mb-12">
            Discover opportunities that match your skills and aspirations. Your next career move is just a click away.
          </p>
  
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#0D3880]/90 backdrop-blur-sm p-6 rounded-lg hover:bg-[#0D3880] transition-all cursor-pointer border border-white/10">
              <h3 className="text-[#FFFFFF] text-2xl font-bold mb-2">Search Jobs</h3>
              <p className="text-[#FFFFFF]/90 flex items-center">
                Browse Opportunities
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </p>
            </div>
            
            <div className="bg-[#E60278]/90 backdrop-blur-sm p-6 rounded-lg hover:bg-[#E60278] transition-all cursor-pointer border border-white/10">
              <h3 className="text-[#FFFFFF] text-2xl font-bold mb-2">Create Profile</h3>
              <p className="text-[#FFFFFF]/90">Showcase Your Skills</p>
            </div>
            
            <div className="bg-[#0D3880]/90 backdrop-blur-sm p-6 rounded-lg hover:bg-[#0D3880] transition-all cursor-pointer border border-white/10">
              <h3 className="text-[#FFFFFF] text-2xl font-bold mb-2">Find Talents</h3>
              <p className="text-[#FFFFFF]/90 flex items-center">
                Hiring Here
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
          <JobFilter isHero={true} />
        </div>
      </div>
    </div>
  );
}
'use client'
import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

export default function AboutUs() {
  const team = [
    {
      name: "Tsania Millatina Aghnia Fariha",
      role: "Fullstack",
      description: "Passionate about creating beautiful web interfaces.",
      instagram: "tsaniamaf",
      linkedin: "tsaniafariha",
    },
    {
      name: "Hanif",
      role: "Fullstack",
      description: "Specialized in building robust and scalable backend systems.",
      instagram: "hanif",
      linkedin: "hanif",
    },
    {
      name: "Wildan",
      role: "Fullstack",
      description: "Dedicated to creating intuitive and engaging user experiences.",
      instagram: "Wildan",
      linkedin: "Wildan",
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      <div className="pt-16 pb-12">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-[#E60278] mb-4">
              Meet Our Team
            </h1>
            <p className="text-gray-600 text-lg">
              The passionate minds behind TalentBridge, dedicated to connecting extraordinary talent with visionary companies.
            </p>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >

              <div className="h-72 bg-gray-100">
                <img
                  src={`/api/placeholder/400/400`}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-[#0D3880] font-medium mt-1">{member.role}</p>
                <p className="text-gray-600 mt-4 text-sm">{member.description}</p>

                <div className="flex items-center space-x-4 mt-6">
                  <Link 
                    href={`https://instagram.com/${member.instagram}`}
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-[#E60278] transition-colors text-sm"
                  >
                    <FaInstagram className="w-4 h-4" />
                    <span className="ml-2">{member.instagram}</span>
                  </Link>
                  <Link 
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-[#0D3880] transition-colors text-sm"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    <span className="ml-2">{member.linkedin}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
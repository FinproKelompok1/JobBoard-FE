'use client';
import React from 'react';


enum JobCategory {
  accountancy = 'accountancy',
  sales = 'sales',
  marketing = 'marketing',
  engineering = 'engineering',
  construction = 'construction',
  tourism = 'tourism',
  administration = 'administration',
  manufacture = 'manufacture',
  informatics = 'informatics'
}

export default function DiscoverySection() {
  const jobs = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000", 
      title: "Senior Frontend Developer",
      banner: "/banners/tech-job.jpg",
      category: JobCategory.informatics,
      role: "Senior Developer",
      salary: 25000000,
      description: "We are looking for a senior frontend developer with extensive experience in React and TypeScript.",
      endDate: "2025-03-01T00:00:00Z",
      isPublished: true,
      isTestActive: true,
      tags: ["React", "TypeScript", "Senior Level"],
      isActive: true,
      admin: {
        companyName: "Tech Solutions Indonesia",
        logo: "/logos/tech-solutions.png",
        description: "Leading tech company in Indonesia"
      },
      location: {
        city: "Jakarta Selatan",
        province: "DKI Jakarta"
      }
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      title: "Marketing Manager",
      banner: "/banners/marketing-job.jpg",
      category: JobCategory.marketing,
      role: "Manager",
      salary: 18000000,
      description: "Looking for an experienced marketing manager to lead our digital marketing initiatives.",
      endDate: "2025-02-28T00:00:00Z",
      isPublished: true,
      isTestActive: false,
      tags: ["Digital Marketing", "Leadership", "5 Years Experience"],
      isActive: true,
      admin: {
        companyName: "Global Brands Co",
        logo: "/logos/global-brands.png",
        description: "International consumer goods company"
      },
      location: {
        city: "Surabaya",
        province: "Jawa Timur"
      }
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      title: "Junior Accountant",
      banner: "/banners/finance-job.jpg",
      category: JobCategory.accountancy,
      role: "Junior Staff",
      salary: 8000000,
      description: "Entry level position for fresh graduates in accounting.",
      endDate: "2025-02-25T00:00:00Z",
      isPublished: true,
      isTestActive: true,
      tags: ["Fresh Graduate", "Accounting", "Full-time"],
      isActive: true,
      admin: {
        companyName: "Finance Plus Corp",
        logo: "/logos/finance-plus.png",
        description: "Leading financial services company"
      },
      location: {
        city: "Bandung",
        province: "Jawa Barat"
      }
    }
  ];

  const formatSalary = (salary: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const getCategoryIcon = (category: JobCategory) => {
    const icons: Record<JobCategory, string> = {
      [JobCategory.accountancy]: '💼',
      [JobCategory.sales]: '🤝',
      [JobCategory.marketing]: '📢',
      [JobCategory.engineering]: '⚙️',
      [JobCategory.construction]: '🏗️',
      [JobCategory.tourism]: '✈️',
      [JobCategory.administration]: '📋',
      [JobCategory.manufacture]: '🏭',
      [JobCategory.informatics]: '💻'
    };
    return icons[category];
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
            Jobs Near You
          </h2>
          <p className="text-gray-600">
            Find the best opportunities in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {job.banner && (
                <div className="mb-4 -mx-6 -mt-6">
                  <img 
                    src={job.banner} 
                    alt={job.title} 
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    {job.admin.logo ? (
                      <img 
                        src={job.admin.logo} 
                        alt={job.admin.companyName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                        {job.admin.companyName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="ml-3 text-2xl" title={job.category}>
                    {getCategoryIcon(job.category)}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {job.category}
                  </span>
                  {job.isTestActive && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Test Required
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#0D3880] mb-2">
                {job.title}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                {job.admin.companyName}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                {job.role}
              </p>


              <div className="space-y-2 mb-4">
                <p className="text-gray-600 text-sm flex items-center">
                  <span className="mr-2">📍</span>
                  {job.location.city}, {job.location.province}
                </p>
                {job.salary && (
                  <p className="text-gray-600 text-sm flex items-center">
                    <span className="mr-2">💰</span>
                    {formatSalary(job.salary)}
                  </p>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Deadline: {new Date(job.endDate).toLocaleDateString('id-ID')}
                </span>
                <button className="inline-flex items-center text-[#E60278] hover:text-[#E60278]/80 text-sm font-medium transition-colors">
                  Lihat Detail
                  <svg 
                    className="w-4 h-4 ml-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import Hero from "@/components/homepage/hero";
import DiscoverySection from "@/components/homepage/jobDiscovery";
import CompanyDiscovery from "@/components/homepage/companyDiscovery";

export default function Home() {
  return (
<main className="bg-gray-50"> {/* or whatever color matches your site background */}
  <Hero />
  <div className="px-6 md:px-10 lg:px-16 bg-gray-50"> {/* same bg color */}
    <DiscoverySection />
    <CompanyDiscovery />
  </div>
</main>
  );
}
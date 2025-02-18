'use client';

import Hero from "@/components/homepage/hero";
import DiscoverySection from "@/components/homepage/jobDiscovery";
import CompanyDiscovery from "@/components/homepage/companyDiscover";

export default function Home() {
  return (
    <div>
      <Hero />
      <DiscoverySection />
      <CompanyDiscovery />
    </div>
  );
}
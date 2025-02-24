// pages/index.tsx
'use client';

import Hero from "@/components/homepage/hero";
import DiscoverySection from "@/components/homepage/jobDiscovery";
import CompanyDiscovery from "@/components/homepage/companyDiscovery";

export default function Home() {
  return (
    <main>
      <Hero />
      <DiscoverySection />
      <CompanyDiscovery />
    </main>
  );
}
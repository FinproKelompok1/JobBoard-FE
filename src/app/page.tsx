import Hero from "@/components/homepage/hero";
import DiscoverySection from "@/components/homepage/jobDiscovery";
import Navbar from "@/components/navbar/navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <DiscoverySection />
    </div>
  );
}
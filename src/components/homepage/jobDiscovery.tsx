'use client';
import { useEffect } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useJobs } from '@/hooks/useJobs';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import JobsList from '@/components/homepage/jobList';
import LocationPrompt from '@/components/homepage/locationPrompt';
import LoadingState from '@/components/homepage/loadinhState';
import { getCategoryIcon } from '@/helpers/category';

export default function DiscoverySection() {
  const { userLocation, showLocationPrompt, handleLocationPermission } = useLocation();
  const { jobs, isLoading, fetchJobs } = useJobs(userLocation);

  useEffect(() => {
    if (!showLocationPrompt) {
      fetchJobs();
    }
  }, [showLocationPrompt, fetchJobs]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {showLocationPrompt && (
          <LocationPrompt onAllow={handleLocationPermission} />
        )}

        {isLoading ? (
          <LoadingState />
        ) : (
          <JobsList 
            jobs={jobs}
            userLocation={userLocation}
            CurrencyFormatter={CurrencyFormatter}
            getCategoryIcon={getCategoryIcon}
          />
        )}
      </div>
    </section>
  );
}
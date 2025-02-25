'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAllJobs } from '@/hooks/useAllJobs'; // Gunakan hook baru
import JobFilter, { FilterParams } from '@/components/homepage/filter';
import JobsList from '@/components/homepage/jobList';
import Pagination from '@/components/homepage/pagination';
import LoadingPage from '@/components/loading';
import { getCategoryIcon } from '@/helpers/category';
import { CurrencyFormatter } from '../../../helpers/currencryFormatter';
import { toast } from 'react-toastify';

interface LocationState {
  city: string;
  province: string;
}

export default function AllJobsPage() {
  const searchParams = useSearchParams();
  const { jobs, isLoading, pagination, fetchJobs, changePage } = useAllJobs(3); // 12 jobs per page
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterParams>({
    searchTerm: '',
    category: '',
    province: '',
    city: ''
  });

  // Load saved location on initial render
  useEffect(() => {
    const loadSavedLocation = () => {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          if (location && location.city && location.province) {
            setUserLocation(location);
          }
        } catch (e) {
          console.error("Error parsing saved location:", e);
          localStorage.removeItem('userLocation');
        }
      }
    };

    loadSavedLocation();
  }, []);

  // Initial fetch based on search params
  useEffect(() => {
    const initialFilters = {
      searchTerm: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      province: searchParams.get('province') || '',
      city: searchParams.get('city') || ''
    };
    
    setCurrentFilters(initialFilters);
    fetchJobs(initialFilters);
  }, [searchParams, fetchJobs]);
  
  const handleFilter = (filters: FilterParams) => {
    // If we're using location, add location to the filters
    const updatedFilters = { ...filters };
    
    if (isUsingLocation && userLocation) {
      updatedFilters.city = userLocation.city;
      updatedFilters.province = userLocation.province;
    }
    
    setCurrentFilters(updatedFilters);
    fetchJobs(updatedFilters, 1); // Reset to page 1 when filters change
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    changePage(page, currentFilters);
    
    // Scroll to top of results
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Toggle location usage
  const toggleLocationFilter = async () => {
    if (isUsingLocation) {
      // Turn off location filtering
      setIsUsingLocation(false);
      
      // Remove location from filters
      const updatedFilters = {
        ...currentFilters,
        city: '',
        province: ''
      };
      
      setCurrentFilters(updatedFilters);
      fetchJobs(updatedFilters, 1); // Reset to page 1
      return;
    }
    
    // Turn on location filtering
    if (userLocation) {
      // We already have location, use it
      setIsUsingLocation(true);
      
      // Add location to filters
      const updatedFilters = {
        ...currentFilters,
        city: userLocation.city,
        province: userLocation.province
      };
      
      setCurrentFilters(updatedFilters);
      fetchJobs(updatedFilters, 1); // Reset to page 1
    } else {
      // Need to get location first
      setIsLoadingLocation(true);
      
      try {
        if (!("geolocation" in navigator)) {
          throw new Error("Geolocation not supported");
        }
        
        // Get user position
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000
          });
        });
        
        // Get location details from coordinates
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa`
        );
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const components = data.results[0].components;
          
          // Get city and province from results
          const cityName = components.city || components.town || components.county || 
                         components.state_district || components.municipality;
          const provinceName = components.state || components.province || components.region;
          
          if (cityName) {
            // Format city name
            let formattedCity = cityName;
            if (components.country_code === 'id' && 
                !formattedCity.toUpperCase().startsWith('KOTA') &&
                !formattedCity.toUpperCase().startsWith('KABUPATEN')) {
              formattedCity = `KOTA ${formattedCity}`;
            }
            
            // Create location object
            const location = {
              city: formattedCity.toUpperCase(),
              province: provinceName ? provinceName.toUpperCase() : ""
            };
            
            // Save location
            setUserLocation(location);
            localStorage.setItem('userLocation', JSON.stringify(location));
            setIsUsingLocation(true);
            
            // Add location to filters
            const updatedFilters = {
              ...currentFilters,
              city: location.city,
              province: location.province
            };
            
            setCurrentFilters(updatedFilters);
            fetchJobs(updatedFilters, 1); // Reset to page 1
            toast.success(`Showing jobs in ${location.city}`);
          } else {
            throw new Error("Couldn't determine your city");
          }
        } else {
          throw new Error("Couldn't get location details");
        }
      } catch (error) {
        console.error("Error getting location:", error);
        if (error instanceof GeolocationPositionError && error.code === error.PERMISSION_DENIED) {
          toast.info("Location access denied");
        } else {
          toast.error("Couldn't get your location");
        }
      } finally {
        setIsLoadingLocation(false);
      }
    }
  };
  
  if (isLoading || isLoadingLocation) {
    return <LoadingPage isLoading={true} />;
  }
  
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0D3880] mb-2">
              {isUsingLocation && userLocation ? 'Jobs Near You' : 'All Job Listings'}
            </h1>
            <p className="text-gray-600">
              {isUsingLocation && userLocation 
                ? `Showing jobs in ${userLocation.city}, ${userLocation.province}` 
                : 'Find career opportunities that match your skills and interests'}
            </p>
          </div>
          
          <button
            onClick={toggleLocationFilter}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 flex items-center space-x-2"
          >
            {isUsingLocation ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Show All Jobs</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Show Nearby Jobs</span>
              </>
            )}
          </button>
        </div>
        
        <JobFilter 
          onSearch={handleFilter}
          isHero={false}
          className="mb-8 p-4 bg-white rounded-lg shadow"
          initialFilters={currentFilters}
        />
        
        <JobsList 
          jobs={jobs}
          userLocation={isUsingLocation ? userLocation : null}
          CurrencyFormatter={CurrencyFormatter}
          getCategoryIcon={getCategoryIcon} 
        />
        
        {/* Pagination component, hanya ditampilkan jika lebih dari 1 halaman */}
        {pagination.totalPages > 1 && (
          <>
            <Pagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
            
            {/* Jobs count and page info */}
            <div className="text-center text-gray-500 mt-4">
              Showing {jobs.length} of {pagination.totalItems} jobs - Page {pagination.currentPage} of {pagination.totalPages}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
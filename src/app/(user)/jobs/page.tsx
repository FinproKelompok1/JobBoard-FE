'use client';

import React, { useState, useEffect } from 'react';
import { useAllJobs } from '@/hooks/useAllJobs'; 
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
  const { jobs, isLoading, pagination, fetchJobs, changePage } = useAllJobs(3); 
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterParams>({
    searchTerm: '',
    category: '',
    province: '',
    city: ''
  });

  // Get URL search params without the hook
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      const initialFilters = {
        searchTerm: urlParams.get('search') || '',
        category: urlParams.get('category') || '',
        province: urlParams.get('province') || '',
        city: urlParams.get('city') || ''
      };
      
      setCurrentFilters(initialFilters);
      fetchJobs(initialFilters);
    }
  }, [fetchJobs]);

  // Listen for URL changes
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        
        const updatedFilters = {
          searchTerm: urlParams.get('search') || currentFilters.searchTerm,
          category: urlParams.get('category') || currentFilters.category,
          province: urlParams.get('province') || currentFilters.province,
          city: urlParams.get('city') || currentFilters.city
        };
        
        setCurrentFilters(updatedFilters);
        fetchJobs(updatedFilters);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentFilters, fetchJobs]);

  useEffect(() => {
    const loadSavedLocation = () => {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          if (location && location.city && location.province) {
            setUserLocation(location);
          }
        } catch {
          localStorage.removeItem('userLocation');
        }
      }
    };

    loadSavedLocation();
  }, []);
  
  const handleFilter = (filters: FilterParams) => {
    const updatedFilters = { ...filters };
    
    if (isUsingLocation && userLocation) {
      updatedFilters.city = userLocation.city;
      updatedFilters.province = userLocation.province;
    }
    
    setCurrentFilters(updatedFilters);
    fetchJobs(updatedFilters, 1); 
  };
  
  const handlePageChange = (page: number) => {
    changePage(page, currentFilters);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const toggleLocationFilter = async () => {
    if (isUsingLocation) {
      setIsUsingLocation(false);
      
      const updatedFilters = {
        ...currentFilters,
        city: '',
        province: ''
      };
      
      setCurrentFilters(updatedFilters);
      fetchJobs(updatedFilters, 1); 
      return;
    }
    
    if (userLocation) {
      setIsUsingLocation(true);
      
      const updatedFilters = {
        ...currentFilters,
        city: userLocation.city,
        province: userLocation.province
      };
      
      setCurrentFilters(updatedFilters);
      fetchJobs(updatedFilters, 1); 
    } else {
      setIsLoadingLocation(true);
      
      try {
        if (!("geolocation" in navigator)) {
          throw new Error("Geolocation not supported");
        }
        
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000
          });
        });
        
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa`
        );
        
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const components = data.results[0].components;
          
          const cityName = components.city || components.town || components.county || 
                         components.state_district || components.municipality;
          const provinceName = components.state || components.province || components.region;
          
          if (cityName) {
            let formattedCity = cityName;
            if (components.country_code === 'id' && 
                !formattedCity.toUpperCase().startsWith('KOTA') &&
                !formattedCity.toUpperCase().startsWith('KABUPATEN')) {
              formattedCity = `KOTA ${formattedCity}`;
            }
            
            const location = {
              city: formattedCity.toUpperCase(),
              province: provinceName ? provinceName.toUpperCase() : ""
            };
            
            setUserLocation(location);
            localStorage.setItem('userLocation', JSON.stringify(location));
            setIsUsingLocation(true);
            
            const updatedFilters = {
              ...currentFilters,
              city: location.city,
              province: location.province
            };
            
            setCurrentFilters(updatedFilters);
            fetchJobs(updatedFilters, 1); 
            toast.success(`Showing jobs in ${location.city}`);
          } else {
            throw new Error("Couldn't determine your city");
          }
        } else {
          throw new Error("Couldn't get location details");
        }
      } catch (error) {
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
'use client';

import React, { useState, useEffect } from 'react';
import { useAllJobs } from '@/hooks/useAllJobs'; 
import JobFilter, { FilterParams } from '@/components/homepage/filter';
import JobsList from '@/components/homepage/jobList';
import Pagination from '@/components/homepage/pagination';
import LoadingPage from '@/components/loading';
import { getCategoryIcon } from '@/helpers/category';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import { toast } from 'react-toastify';

interface LocationState {
  city: string;
  province: string;
}

export default function AllJobsPage() {
  const { jobs, isLoading, pagination, fetchJobs, changePage } = useAllJobs(6); // Increased items per page for better UX
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterParams>({
    searchTerm: '',
    category: '',
    province: '',
    city: ''
  });

  // Load filters from URL on initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      
      const initialFilters: FilterParams = {
        searchTerm: urlParams.get('search') || '',
        category: urlParams.get('category') || '',
        province: urlParams.get('province') || '',
        city: urlParams.get('city') || ''
      };
      
      console.log('Initial filters from URL:', initialFilters);
      setCurrentFilters(initialFilters);
      fetchJobs(initialFilters);
    }
  }, [fetchJobs]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        
        const updatedFilters: FilterParams = {
          searchTerm: urlParams.get('search') || '',
          category: urlParams.get('category') || '',
          province: urlParams.get('province') || '',
          city: urlParams.get('city') || ''
        };
        
        console.log('URL changed, new filters:', updatedFilters);
        setCurrentFilters(updatedFilters);
        fetchJobs(updatedFilters);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [fetchJobs]);

  // Load saved user location from localStorage
  useEffect(() => {
    const loadSavedLocation = () => {
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          if (location && location.city && location.province) {
            setUserLocation(location);
            console.log('Loaded saved location:', location);
          }
        } catch (error) {
          console.error('Error parsing saved location:', error);
          localStorage.removeItem('userLocation');
        }
      }
    };

    loadSavedLocation();
  }, []);
  
  // Handle filter submission from JobFilter component
  const handleFilter = (filters: FilterParams) => {
    console.log('Filter submitted:', filters);
    
    const updatedFilters = { ...filters };
    
    // Apply location filter if enabled
    if (isUsingLocation && userLocation) {
      updatedFilters.city = userLocation.city;
      updatedFilters.province = userLocation.province;
      console.log('Applied location filter:', userLocation);
    }
    
    setCurrentFilters(updatedFilters);
    fetchJobs(updatedFilters, 1); 
    
    // Update URL to reflect current filters (optional)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (updatedFilters.searchTerm) params.append('search', updatedFilters.searchTerm);
      if (updatedFilters.category) params.append('category', updatedFilters.category);
      if (updatedFilters.province) params.append('province', updatedFilters.province);
      if (updatedFilters.city) params.append('city', updatedFilters.city);
      
      const queryString = params.toString();
      const newUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
      window.history.pushState({}, '', newUrl);
    }
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    changePage(page, currentFilters);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Toggle location-based filtering
  const toggleLocationFilter = async () => {
    if (isUsingLocation) {
      console.log('Disabling location filter');
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
      console.log('Enabling location filter with saved location:', userLocation);
      setIsUsingLocation(true);
      
      const updatedFilters = {
        ...currentFilters,
        city: userLocation.city,
        province: userLocation.province
      };
      
      setCurrentFilters(updatedFilters);
      fetchJobs(updatedFilters, 1); 
    } else {
      console.log('Fetching user location...');
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
        
        console.log('Got coordinates:', position.coords);
        
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa`
        );
        
        const data = await response.json();
        console.log('Geocoding response:', data);
        
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
            
            console.log('Setting location:', location);
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
        console.error('Location error:', error);
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
          className="mb-8 p-4 bg-white rounded-lg shadow border border-gray-200"
          initialFilters={currentFilters}
        />
        
        {jobs.length > 0 ? (
          <JobsList 
            jobs={jobs}
            userLocation={isUsingLocation ? userLocation : null}
            CurrencyFormatter={CurrencyFormatter}
            getCategoryIcon={getCategoryIcon} 
          />
        ) : (
          <div className="text-center p-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800">No jobs found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters to see more results</p>
          </div>
        )}
        
        {pagination.totalPages > 1 && (
          <>
            <Pagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
            
            <div className="text-center text-gray-500 mt-4">
              Showing {jobs.length} of {pagination.totalItems} jobs - Page {pagination.currentPage} of {pagination.totalPages}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
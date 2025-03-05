'use client';
import { useEffect, useState, useCallback } from 'react';
import { CurrencyFormatter } from '@/helpers/currencryFormatter';
import JobsList from '@/components/homepage/jobList';
import LoadingState from '@/components/homepage/loadingState';
import { getCategoryIcon } from '@/helpers/category';
import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { Job } from "@/types/jobdis";

interface LocationState {
  city: string;
  province: string;
  timestamp?: number; 
}

interface DiscoverParams {
  city?: string;
  province?: string;
  sort?: string;
  order?: string;
  limit?: number;
}

const LOCATION_EXPIRY_MS = 24 * 60 * 60 * 1000;

function normalizeLocationString(str: string): string {
  return str
    .replace(/\s+/g, ' ')      
    .replace(/ CITY$/i, '')    
    .trim()
    .toUpperCase();
}

async function discoverJobs(params?: DiscoverParams): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      });
    }

    const queryString = queryParams.toString();
    const url = `/discover${queryString ? `?${queryString}` : ""}`;

    console.log("Discovering jobs with URL:", url);
    const response = await axios.get(url);
    return response.data.result || [];
  } catch (error) {
    toastErrAxios(error);
    return [];
  }
}

export default function DiscoverySection() {
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noJobsFound, setNoJobsFound] = useState(false);

  const fetchLatestJobs = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const latestJobs = await discoverJobs({
        sort: "createdAt",
        order: "desc",
        limit: 3
      });
      
      setJobs(latestJobs);
      setIsLoading(false);
    } catch {
      setJobs([]);
      setIsLoading(false);
    }
  }, []);

  const fetchJobsByLocation = useCallback(async (location: LocationState) => {
    setIsLoading(true);
    
    try {
      const normalizedCity = normalizeLocationString(location.city);
      const normalizedProvince = normalizeLocationString(location.province);
      
      console.log("Fetching jobs with normalized location:", { 
        city: normalizedCity, 
        province: normalizedProvince 
      });
      
      const locationJobs = await discoverJobs({
        city: normalizedCity,
        province: normalizedProvince,
        limit: 3
      });
      
      if (locationJobs.length === 0) {
        console.log("No jobs found with normalized location, showing all jobs instead");
        setNoJobsFound(true);
        await fetchLatestJobs();
      } else {
        console.log(`Found ${locationJobs.length} jobs with normalized location`);
        setJobs(locationJobs);
        setNoJobsFound(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching jobs by location:", error);
      await fetchLatestJobs();
    }
  }, [fetchLatestJobs]);

  const handleLocationChoice = async (useLocation: boolean) => {
    setShowPrompt(false);
    
    if (!useLocation) {
      localStorage.setItem('locationPreference', JSON.stringify({
        preferNotToUse: true,
        timestamp: Date.now()
      }));
      
      await fetchLatestJobs();
      return;
    }
    
    if (!("geolocation" in navigator)) {
      await fetchLatestJobs();
      return;
    }
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000
        });
      });
      
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa&language=id`
      );
      
      const data = await response.json();
      console.log("OpenCage API response:", data);
      
      if (data.results && data.results.length > 0) {
        const components = data.results[0].components;
        console.log("Location components:", components);
        
        const cityName = components.city || components.town || components.county || 
                        components.state_district || components.municipality;
                        
        const provinceName = components.state || components.province || components.region;
        
        if (cityName) {
          let formattedCity = cityName;
          
          if (components.country_code === 'id') {
            const lowerCity = formattedCity.toLowerCase();
            if (!lowerCity.startsWith('kota') && !lowerCity.startsWith('kabupaten')) {
              const isKabupaten = components.county && 
                                components.county.toLowerCase().includes(lowerCity);
              formattedCity = isKabupaten ? `Kabupaten ${formattedCity}` : `Kota ${formattedCity}`;
            }
          }
          
          const location = {
            city: formattedCity.toUpperCase(),
            province: provinceName ? provinceName.toUpperCase() : "",
            timestamp: Date.now() 
          };
          
          console.log("Setting user location:", location);
          setUserLocation(location);
          localStorage.setItem('userLocation', JSON.stringify(location));
          await fetchJobsByLocation(location);
          return;
        }
      }
      
      await fetchLatestJobs();
    } catch (error) {
      console.error("Error getting location:", error);
      await fetchLatestJobs();
    }
  };
  
  useEffect(() => {
    const checkSavedLocation = async () => {
      const locationPref = localStorage.getItem('locationPreference');
      if (locationPref) {
        try {
          const pref = JSON.parse(locationPref);
          const now = Date.now();
          const isExpired = !pref.timestamp || (now - pref.timestamp > LOCATION_EXPIRY_MS);
          
          if (!isExpired && pref.preferNotToUse) {
            setShowPrompt(false);
            await fetchLatestJobs();
            return;
          } else if (isExpired) {
            localStorage.removeItem('locationPreference');
          }
        } catch {
          localStorage.removeItem('locationPreference');
        }
      }
      
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          if (location && location.city && location.province) {
            const now = Date.now();
            const isExpired = !location.timestamp || (now - location.timestamp > LOCATION_EXPIRY_MS);
            
            if (isExpired) {
              console.log("Location data expired, showing prompt");
              setShowPrompt(true);
              return;
            }
            
            setUserLocation(location);
            setShowPrompt(false);
            await fetchJobsByLocation(location);
            return;
          }
        } catch {
          localStorage.removeItem('userLocation');
        }
      }
      
      setShowPrompt(true);
    };
    
    checkSavedLocation();
  }, [fetchJobsByLocation]);

  const handleViewMoreJobs = () => {
    window.location.href = '/jobs';
  };
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {showPrompt ? (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Job Search
              </h2>
              <p className="text-gray-600 mb-6">
                Would you like to see jobs near your location or browse all jobs?
              </p>
              <div className="flex justify-between space-x-4">
                <button
                  onClick={() => handleLocationChoice(false)}
                  className="px-4 py-3 text-gray-600 border border-gray-300 rounded hover:bg-gray-100 transition-colors flex-1"
                >
                  All Jobs
                </button>
                <button
                  onClick={() => handleLocationChoice(true)}
                  className="px-4 py-3 bg-[#0D3880] text-white rounded hover:bg-[#0D3880]/90 transition-colors flex-1"
                >
                  Jobs Near Me
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0D3880] mb-2">
                  {userLocation && !noJobsFound ? 'Jobs Near You' : 'All Jobs'}
                </h2>
                <p className="text-gray-600">
                  {userLocation && !noJobsFound 
                    ? `Showing jobs in ${userLocation.city}, ${userLocation.province}`
                    : 'Explore job opportunities'}
                </p>
              </div>
              
              <button
                onClick={handleViewMoreJobs}
                className="px-4 py-2 bg-[#0D3880] text-white rounded hover:bg-[#0D3880]/90 transition-colors"
              >
                View All Jobs
              </button>
            </div>

            {noJobsFound && userLocation && (
              <div className="mb-4 p-4 bg-blue-50 text-blue-800 rounded-md">
                <p>No jobs found in {userLocation.city}, {userLocation.province}.</p>
                <p>Showing all available jobs instead.</p>
              </div>
            )}

            {isLoading ? (
              <LoadingState />
            ) : (
              <JobsList 
                jobs={jobs}
                userLocation={userLocation && !noJobsFound ? userLocation : null}
                CurrencyFormatter={CurrencyFormatter}
                getCategoryIcon={getCategoryIcon}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
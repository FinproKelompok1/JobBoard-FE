'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

interface JobFilterProps {
  onSearch?: (filters: FilterParams) => void;
  isHero?: boolean;
  className?: string;
  initialFilters?: FilterParams;
}

export interface FilterParams {
  searchTerm?: string;
  category?: string;
  province?: string;
  city?: string;
}

export default function JobFilter({ 
  onSearch, 
  isHero = false, 
  className = "",
  initialFilters = { searchTerm: '', category: '', province: '', city: '' }
}: JobFilterProps) {
  const router = useRouter();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('');
  const [selectedCityId, setSelectedCityId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>(initialFilters?.searchTerm || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialFilters?.category || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const categories = [
    'Accountancy',
    'Sales',
    'Marketing',
    'Engineering',
    'Construction',
    'Tourism',
    'Administration',
    'Manufacture',
    'Informatics'
  ];

  useEffect(() => {
    if (initialFilters) {
      setSearchTerm(initialFilters.searchTerm || '');
      setSelectedCategory(initialFilters.category || '');
      
     
    }
  }, [initialFilters]);

  useEffect(() => {
    const fetchProvinces = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/provinces.json');
        if (!response.ok) {
          throw new Error('Failed to fetch provinces');
        }
        const data = await response.json();
        setProvinces(data);
        
        if (initialFilters?.province) {
          const provinceItem = data.find((p: Province) => 
            p.name.toLowerCase() === initialFilters.province?.toLowerCase()
          );
          if (provinceItem) {
            console.log('Found province by name:', provinceItem);
            setSelectedProvinceId(provinceItem.id);
          }
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProvinces();
  }, [initialFilters?.province]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvinceId) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/regencies/${selectedProvinceId}.json`);
          if (!response.ok) {
            throw new Error('Failed to fetch cities');
          }
          const data = await response.json();
          setCities(data);
          
          if (initialFilters?.city) {
            const cityItem = data.find((c: City) => 
              c.name.toLowerCase() === initialFilters.city?.toLowerCase()
            );
            if (cityItem) {
              console.log('Found city by name:', cityItem);
              setSelectedCityId(cityItem.id);
            }
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
          setCities([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCities([]);
        setSelectedCityId('');
      }
    };
    
    fetchCities();
  }, [selectedProvinceId, initialFilters?.city]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const provinceName = provinces.find((p: Province) => p.id === selectedProvinceId)?.name || '';
    const cityName = cities.find((c: City) => c.id === selectedCityId)?.name || '';
    
    console.log('Sending search with:', {
      searchTerm,
      category: selectedCategory,
      province: provinceName,  
      city: cityName           
    });
    
    const filters: FilterParams = {
      searchTerm: searchTerm || '',
      category: selectedCategory || '',
      province: provinceName,  
      city: cityName           
    };

    if (isHero) {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (provinceName) params.append('province', provinceName);
      if (cityName) params.append('city', cityName);
      
      const queryString = params.toString();
      router.push(`/jobs${queryString ? `?${queryString}` : ''}`);
    } else if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex flex-col md:flex-row items-center gap-4 ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Job Title, Skills, Keywords"
        className="w-full md:flex-1 p-3 rounded bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        style={{ position: 'relative', zIndex: 10 }}
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-auto p-3 rounded bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        style={{ position: 'relative', zIndex: 10 }}
      >
        <option value="">Any Category</option>
        {categories.map((category: string) => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedProvinceId}
        onChange={(e) => {
          console.log('Province ID changed:', e.target.value);
          setSelectedProvinceId(e.target.value);
          setSelectedCityId('');
        }}
        className="w-full md:w-auto p-3 rounded bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        disabled={isLoading}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <option value="">Any Province</option>
        {provinces.map((province: Province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCityId}
        onChange={(e) => {
          console.log('City ID changed:', e.target.value);
          setSelectedCityId(e.target.value);
        }}
        className="w-full md:w-auto p-3 rounded bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
        disabled={!selectedProvinceId || isLoading}
        style={{ position: 'relative', zIndex: 10 }}
      >
        <option value="">Any City</option>
        {cities.map((city: City) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full md:w-auto bg-[#E60278] text-white px-8 py-3 rounded hover:bg-[#E60278]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#E60278] focus:ring-offset-2 z-10"
        style={{ position: 'relative', zIndex: 10 }}
      >
        Search
      </button>
    </form>
  );
}
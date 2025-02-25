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
  searchTerm: string;
  category: string;
  province: string;
  city: string;
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
  const [selectedProvince, setSelectedProvince] = useState<string>(initialFilters?.province || '');
  const [selectedCity, setSelectedCity] = useState<string>(initialFilters?.city || '');
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
      setSelectedProvince(initialFilters.province || '');
      setSelectedCity(initialFilters.city || '');
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
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        setIsLoading(true);
        try {
          const response = await fetch(`https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`);
          if (!response.ok) {
            throw new Error('Failed to fetch cities');
          }
          const data = await response.json();
          setCities(data);
        } catch (error) {
          setCities([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const filters: FilterParams = {
      searchTerm: searchTerm || '',
      category: selectedCategory || '',
      province: selectedProvince || '',
      city: selectedCity || ''
    };

    if (isHero) {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedProvince) params.append('province', selectedProvince);
      if (selectedCity) params.append('city', selectedCity);
      
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
        className="w-full md:flex-1 p-3 rounded bg-white/80 backdrop-blur border border-white/20 placeholder:text-gray-500 text-gray-800"
      />

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-auto p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
      >
        <option value="">Any Category</option>
        {categories.map(category => (
          <option key={category} value={category.toLowerCase()}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={selectedProvince}
        onChange={(e) => {
          setSelectedProvince(e.target.value);
          setSelectedCity('');
        }}
        className="w-full md:w-auto p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
        disabled={isLoading}
      >
        <option value="">Any Province</option>
        {provinces.map(province => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="w-full md:w-auto p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
        disabled={!selectedProvince || isLoading}
      >
        <option value="">Any City</option>
        {cities.map(city => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full md:w-auto bg-[#E60278] text-white px-8 py-3 rounded hover:bg-[#E60278]/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
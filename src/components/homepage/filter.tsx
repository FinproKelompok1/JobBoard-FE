'use client'
import React, { useState, useEffect } from 'react';

interface Province {
  id: string;
  name: string;
}

interface City {
  id: string;
  name: string;
}

export default function JobFilter() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

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
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/provinces.json');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(`https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`);
          const data = await response.json();
          setCities(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCities([]);
      }
    };
    fetchCities();
  }, [selectedProvince]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      searchTerm,
      selectedCategory,
      selectedProvince,
      selectedCity
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        placeholder="Job Title, Skills, Keywords"
        className="flex-1 p-3 rounded bg-white/80 backdrop-blur border border-white/20 placeholder:text-gray-500 text-gray-800"
      />

      <select
        value={selectedCategory}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
        className="p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectedProvince(e.target.value);
          setSelectedCity('');
        }}
        className="p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
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
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value)}
        className="p-3 rounded bg-white/80 backdrop-blur border border-white/20 text-gray-800"
        disabled={!selectedProvince}
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
        className="bg-[#E60278] text-white px-8 py-3 rounded hover:bg-[#E60278]/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
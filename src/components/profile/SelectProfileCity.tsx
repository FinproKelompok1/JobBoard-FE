import React, { useEffect, useState } from 'react';

interface City {
  id: string;
  name: string;
}

interface SelectProfileCityProps {
  values: {
    city: string;
    province: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  provinceId: string;
}

const SelectProfileCity: React.FC<SelectProfileCityProps> = ({
  values,
  handleChange,
  provinceId
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      if (!provinceId) {
        setCities([]);
        return;
      }
      
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        
        const data = await response.json();
        setCities(data);
      } catch  {
        setError('Failed to fetch cities');
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [provinceId]);

  return (
    <div className="relative">
      <select
        name="city"
        value={values.city}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60278] disabled:bg-gray-100"
        disabled={loading || !provinceId}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {loading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#E60278]"></div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm mt-1">
          {error}
        </div>
      )}
    </div>
  );
};

export default SelectProfileCity;
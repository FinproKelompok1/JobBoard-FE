import { useEffect, useState } from "react";

interface Province {
  id: string;
  name: string;
}

interface IProps {
  values: {
    province: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setProvinceId: (id: string) => void;
}

export default function SelectProfileProvince({ values, handleChange, setProvinceId }: IProps) {
  const [provinces, setProvinces] = useState<Province[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/provinces.json');
        const data = await response.json();
        console.log("Provinces data:", data); // Debug log
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProvince = provinces.find(p => p.name === e.target.value);
    console.log("Selected province:", selectedProvince); // Debug log
    if (selectedProvince) {
      setProvinceId(selectedProvince.id);
      handleChange(e);
    }
  };

  return (
    <select
      name="province"
      value={values.province}
      onChange={handleProvinceSelect}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#E60278]"
    >
      <option value="">Select Province</option>
      {provinces.map(province => (
        <option key={province.id} value={province.name}>
          {province.name}
        </option>
      ))}
    </select>
  );
}
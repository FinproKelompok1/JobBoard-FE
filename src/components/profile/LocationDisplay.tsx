import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
  province?: string | null;
  city?: string | null;
}

const LocationDisplay = ({ province, city }: LocationDisplayProps) => {
  if (!province && !city) {
    return null;
  }

  const locationText = [province, city].filter(Boolean).join(", ");

  return (
    <div className="flex items-center rounded-lg bg-gray-50 p-3">
      <MapPin className="mr-3 h-5 w-5 text-[#E60278]" />
      <div>
        <p className="text-sm text-gray-500">Location</p>
        <p className="text-gray-700">{locationText}</p>
      </div>
    </div>
  );
};

export default LocationDisplay;
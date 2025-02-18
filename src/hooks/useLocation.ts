import { useState, useCallback } from "react";
import { toast } from "react-toastify";

interface LocationState {
  city: string;
  province: string;
}

export function useLocation() {
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  const handleLocationPermission = useCallback(async (allow: boolean) => {
    try {
      setShowLocationPrompt(false);

      if (!allow) {
        setUserLocation(null);
        return;
      }

      if ("geolocation" in navigator) {
        try {
          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            },
          );

          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa`,
          );

          const data = await response.json();

          if (data.results && data.results[0]?.components) {
            const { city, state } = data.results[0].components;
            if (city) {
              const cleanCity = city.replace(/\s*city\s*/i, "").trim();
              setUserLocation({
                city: `KOTA ${cleanCity.toUpperCase()}`,
                province: state ? state.toUpperCase() : "",
              });
            }
          }
        } catch (error) {
          console.error("Error getting location:", error);
          toast.error("Gagal mendapatkan lokasi, menampilkan semua pekerjaan");
          setUserLocation(null);
        }
      } else {
        toast.error("Browser Anda tidak mendukung geolokasi");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Terjadi kesalahan, menampilkan semua pekerjaan");
      setUserLocation(null);
    }
  }, []);

  return {
    userLocation,
    showLocationPrompt,
    handleLocationPermission,
  };
}

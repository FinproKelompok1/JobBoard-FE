import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

interface LocationState {
  city: string;
  province: string;
}

export function useLocation() {
  const [userLocation, setUserLocation] = useState<LocationState | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [isProcessingLocation, setIsProcessingLocation] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        if (parsed && parsed.city && parsed.province) {
          console.log("Loading saved location from localStorage:", parsed);
          setUserLocation(parsed);
          setShowLocationPrompt(false);
        }
      } catch (e) {
        console.error("Error parsing saved location", e);
        localStorage.removeItem("userLocation");
      }
    }
  }, []);

  const handleLocationPermission = useCallback(async (allow: boolean) => {
    try {
      setIsProcessingLocation(true);

      if (!allow) {
        console.log("User chose not to use location");
        setUserLocation(null);
        setShowLocationPrompt(false);
        return;
      }

      if ("geolocation" in navigator) {
        try {
          console.log("Getting user location...");

          toast.info("Getting your location...", { autoClose: 3000 });

          const position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 15000,
                maximumAge: 0,
                enableHighAccuracy: true,
              });
            },
          );

          console.log("Position received:", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          toast.info("Finding your city...", { autoClose: 3000 });

          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=bcf87dd591a44c57b21a10bed03f5daa`,
          );

          const data = await response.json();
          console.log(
            "Geocode response components:",
            data.results?.[0]?.components,
          );

          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;

            let cityValue;

            if (components.country_code === "id") {
              cityValue =
                components.city ||
                components.municipality ||
                components.county ||
                components.state_district;

              if (!cityValue && data.results[0].formatted) {
                const addressParts = data.results[0].formatted
                  .split(",")
                  .map((p: string) => p.trim());

                for (const part of addressParts) {
                  if (
                    part.toLowerCase().includes("kota") ||
                    part.toLowerCase().includes("kabupaten")
                  ) {
                    cityValue = part;
                    break;
                  }
                }

                if (!cityValue && components.state) {
                  if (components.state.toLowerCase().includes("jakarta")) {
                    cityValue = "Jakarta";
                  } else if (addressParts.length >= 2) {
                    cityValue = addressParts[addressParts.length - 2];
                  }
                }
              }
            } else {
              cityValue =
                components.city ||
                components.town ||
                components.village ||
                components.municipality ||
                components.county;
            }

            const provinceValue =
              components.state || components.province || components.region;

            if (cityValue) {
              let cleanCity = cityValue.replace(/\s*city\s*/i, "").trim();

              if (
                components.country_code === "id" &&
                !cleanCity.toUpperCase().startsWith("KOTA") &&
                !cleanCity.toUpperCase().startsWith("KABUPATEN")
              ) {
                cleanCity = `KOTA ${cleanCity}`;
              }

              const locationData = {
                city: cleanCity.toUpperCase(),
                province: provinceValue ? provinceValue.toUpperCase() : "",
              };

              console.log("Setting location:", locationData);
              localStorage.setItem(
                "userLocation",
                JSON.stringify(locationData),
              );
              setUserLocation(locationData);
              toast.success("Location found!", { autoClose: 3000 });
            } else {
              console.log("No city-like field found in geocode response");
              toast.warning(
                "Couldn't determine your city. Showing all jobs instead.",
                { autoClose: 5000 },
              );
              setUserLocation(null);
            }
          } else {
            console.log("No valid geocode results");
            toast.warning(
              "Couldn't translate coordinates to a location. Showing all jobs instead.",
              { autoClose: 5000 },
            );
            setUserLocation(null);
          }
        } catch (error) {
          console.error("Error getting location:", error);

          if (
            error instanceof GeolocationPositionError &&
            error.code === error.PERMISSION_DENIED
          ) {
            toast.info("Location access denied. Showing latest jobs instead.", {
              autoClose: 5000,
            });
          } else {
            toast.error(
              "Failed to get your location. Showing latest jobs instead.",
              { autoClose: 5000 },
            );
          }
          setUserLocation(null);
        }
      } else {
        toast.error("Your browser doesn't support geolocation", {
          autoClose: 5000,
        });
        setUserLocation(null);
      }

      setShowLocationPrompt(false);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An error occurred. Showing latest jobs instead.", {
        autoClose: 5000,
      });
      setUserLocation(null);
      setShowLocationPrompt(false);
    } finally {
      setIsProcessingLocation(false);
    }
  }, []);

  return {
    userLocation,
    showLocationPrompt,
    isProcessingLocation,
    handleLocationPermission,
  };
}

import { useState, useEffect } from "react";

const useCookie = (key: string): string | null => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    const getCookie = (key: string): string | null => {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        let [cookieKey, cookieVal] = cookie.trim().split("=");
        if (cookieKey === key) {
          return decodeURIComponent(cookieVal);
        }
      }
      return null;
    };

    const value = getCookie(key);
    setCookieValue(value);
  }, [key]);

  return cookieValue;
};

export default useCookie;

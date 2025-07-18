import { useState, useEffect } from "react";

export default function useCachedFetch(key, fetchFunction, options = {}) {
  const { forceRefresh = false, expiryMinutes = null } = options;
  const [data, setData] = useState(() => {
    if (!forceRefresh) {
      const cached = localStorage.getItem(key);
      if (cached) {
        try {
          const { value, timestamp } = JSON.parse(cached);
          if (expiryMinutes) {
            const now = Date.now();
            if (now - timestamp > expiryMinutes * 60 * 1000) {
              localStorage.removeItem(key);
              return null;
            }
          }
          return value;
        } catch {
          localStorage.removeItem(key);
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(!data);

  useEffect(() => {
    if (!data || forceRefresh) {
      setLoading(true);
      fetchFunction().then(fetchedData => {
        setData(fetchedData);
        localStorage.setItem(
          key,
          JSON.stringify({ value: fetchedData, timestamp: Date.now() })
        );
        setLoading(false);
      });
    }
  }, [data, fetchFunction, key, forceRefresh, expiryMinutes]);

  return { data, loading };
} 
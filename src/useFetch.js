import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let startTime;

      try {
        startTime = performance.now();
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        console.log("JSON Data:", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error);
      } finally {
        setLoading(false);
        if (startTime) {
          const endTime = performance.now();
          console.log("Fetch Time:", endTime - startTime, "milliseconds");
        }
      }
    };

    fetchData();
  }, [url]);

  useEffect(() => {
    console.log("useEffect in useFetch:", { data, loading, error });
  }, [data, loading, error]);

  return { data, loading, error };
}

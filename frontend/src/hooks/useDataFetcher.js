import { useState, useCallback } from 'react';
import { fetchArgoData } from '../utils/DataFetcher';


const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

   const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchArgoData(params);
        setData(result);
      } catch (err) {
               const message = err?.message || 'Failed to fetch ARGO data. Please try again.';
        setError(message);
        console.error('Error fetching ARGO data:', err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

 const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, fetchData, reset };
};

export default useDataFetcher;

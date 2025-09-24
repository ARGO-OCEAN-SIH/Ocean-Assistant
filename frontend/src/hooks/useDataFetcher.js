
import { useState, useCallback } from 'react';
import { fetchArgoData } from '../utils/DataFetcher';

const useDataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchArgoData(params);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useDataFetcher;

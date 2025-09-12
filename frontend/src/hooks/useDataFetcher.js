import { useState, useEffect } from 'react';

const useArgoDataFetcher = (query = '') => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;
    setStatus('loading');
    setError(null);

    fetch(`https://api.argo-dashboard.io/data?query=${encodeURIComponent(query)}`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(json => {
        setData(json);
        setStatus('success');
      })
      .catch(err => {
        setError(err.message || 'Unknown error');
        setStatus('error');
      });
  }, [query]);

  return {
    argoData: data,
    fetchStatus: status,
    fetchError: error,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
};

export default useArgoDataFetcher;

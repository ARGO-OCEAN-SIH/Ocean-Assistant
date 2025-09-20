import { useState, useCallback } from 'react';


const useQueryParser = () => {
  const [parsedQuery, setParsedQuery] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState(null);


  const parseQuery = useCallback((query) => {
    setIsParsing(true);
    setError(null);
    try {

      const lowered = query.toLowerCase();

 
      let intent = null;
      if (lowered.includes('argo float')) intent = 'fetch_argo_data';
      else if (lowered.includes('temperature')) intent = 'analyze_temperature';
      else if (lowered.includes('map')) intent = 'show_map';
      else intent = 'unknown';

   
      const params = { raw: query };

      setParsedQuery({ intent, params });
    } catch (e) {
      setError('Failed to parse query');
    } finally {
      setIsParsing(false);
    }
  }, []);


  const resetParser = useCallback(() => {
    setParsedQuery(null);
    setError(null);
    setIsParsing(false);
  }, []);

  return {
    parsedQuery,
    isParsing,
    error,
    parseQuery,
    resetParser,
  };
};

export default useQueryParser;

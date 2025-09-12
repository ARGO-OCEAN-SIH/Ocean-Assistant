import { useState, useCallback } from 'react';

const useOceanQueryParser = () => {
  const [parsedQuery, setParsedQuery] = useState(null);
  const [parsingStatus, setParsingStatus] = useState('idle'); // 'idle' | 'parsing' | 'parsed' | 'error'
  const [parseError, setParseError] = useState(null);

  const parseUserQuery = useCallback((input) => {
    setParsingStatus('parsing');
    setParseError(null);

    try {
      // Example parsing logic – replace with real NLP/LLM/Service API for production
      const lower = input.trim().toLowerCase();
      let result;
      if (lower.includes('salinity')) {
        result = { intent: 'fetch_salinity', params: { region: 'equator', time: 'march 2023' } };
      } else if (lower.includes('argo')) {
        result = { intent: 'show_argo_map', params: {} };
      } else if (lower.includes('bgc')) {
        result = { intent: 'compare_bgc', params: { sea: 'arabian', period: 'last 6 months' } };
      } else {
        result = { intent: 'unknown', params: {} };
      }
      setParsedQuery(result);
      setParsingStatus('parsed');
    } catch (err) {
      setParseError('Query parsing failed.');
      setParsingStatus('error');
    }
  }, []);

  return {
    parsedQuery,
    parsingStatus,
    parseError,
    parseUserQuery,
    isParsing: parsingStatus === 'parsing',
    isParsed: parsingStatus === 'parsed',
    isError: parsingStatus === 'error',
  };
};

export default useOceanQueryParser;

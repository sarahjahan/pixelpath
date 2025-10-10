import { useState, useCallback } from 'react';

/**
 * Custom hook for handling async operations with loading and error states
 * @param {Function} asyncFunction - The async function to execute
 * @param {boolean} _immediate - Whether to execute immediately on mount (unused parameter)
 */
export function useAsync(asyncFunction, _immediate = false) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setStatus('loading');
    setData(null);
    setError(null);

    try {
      const response = await asyncFunction(...args);
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return {
    execute,
    reset,
    status,
    data,
    error,
    isLoading: status === 'loading',
    isError: status === 'error',
    isSuccess: status === 'success',
    isIdle: status === 'idle',
  };
}

/**
 * Custom hook for API calls with built-in error handling and retry logic
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 */
export function useApi(url, options = {}) {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = options.maxRetries || 3;

  const apiCall = useCallback(async () => {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }, [url, options]);

  const asyncState = useAsync(apiCall);

  const retry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      asyncState.execute();
    }
  }, [retryCount, maxRetries, asyncState]);

  const canRetry = retryCount < maxRetries && asyncState.isError;

  return {
    ...asyncState,
    retry,
    canRetry,
    retryCount,
    maxRetries,
  };
}

/**
 * Hook for handling form submissions with loading states
 * @param {Function} submitFunction - Function to execute on form submit
 * @param {Object} options - Configuration options
 */
export function useFormSubmit(submitFunction, options = {}) {
  const { onSuccess, onError, resetOnSuccess = true } = options;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = useCallback(async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitFunction(formData);
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      if (resetOnSuccess) {
        setSubmitError(null);
      }
      
      return result;
    } catch (error) {
      setSubmitError(error);
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [submitFunction, onSuccess, onError, resetOnSuccess]);

  const clearError = useCallback(() => {
    setSubmitError(null);
  }, []);

  return {
    handleSubmit,
    isSubmitting,
    submitError,
    clearError,
  };
}

/**
 * Hook for debounced search functionality
 * @param {Function} searchFunction - Function to execute search
 * @param {number} delay - Debounce delay in milliseconds
 */
export function useDebounceSearch(searchFunction, delay = 300) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const asyncState = useAsync(searchFunction);

  // Debounce the search query
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  // Execute search when debounced query changes
  useState(() => {
    if (debouncedQuery) {
      asyncState.execute(debouncedQuery);
    }
  }, [debouncedQuery, asyncState]);

  return {
    query,
    setQuery,
    debouncedQuery,
    ...asyncState,
  };
}

export default useAsync;
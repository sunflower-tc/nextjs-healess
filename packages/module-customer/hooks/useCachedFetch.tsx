import { DocumentNode, OperationVariables, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

interface UseCachedQueryOptions<TData, TVariables extends OperationVariables> {
  query: DocumentNode;
  variables?: TVariables;
  cacheKey: string;
  cacheHours?: number; // default fallback
}

export function useCachedQuery<
  TData = any,
  TVariables extends OperationVariables = OperationVariables,
>({
  query,
  variables,
  cacheKey,
  cacheHours = 4, // default 4 hours
}: UseCachedQueryOptions<TData, TVariables>) {
  const [data, setData] = useState<TData | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  const EXPIRY_MS = cacheHours * 60 * 60 * 1000;

  // ✅ 1. Try load from cache on mount
  useEffect(() => {
    const now = Date.now();
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        const isValid = now - parsed.timestamp < EXPIRY_MS;

        if (isValid) {
          setData(parsed.data);
          setFromCache(true);
          return;
        } else {
          localStorage.removeItem(cacheKey);
        }
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    // No valid cache, allow query
    setShouldFetch(true);
  }, [cacheKey, EXPIRY_MS]);

  // ✅ 2. Fetch query if needed
  const { loading, error, refetch } = useQuery<TData, TVariables>(query, {
    variables,
    skip: !shouldFetch,
    fetchPolicy: 'network-only',
    onCompleted: (fetchedData) => {
      setData(fetchedData);
      setFromCache(false);

      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: fetchedData,
            timestamp: Date.now(),
          })
        );
      } catch {
        // ignore quota exceeded or storage errors
      }
    },
    onError: () => {
      setFromCache(false);
    },
  });

  return {
    data,
    loading: shouldFetch ? loading : false,
    fromCache,
    refetch,
    error,
  };
}

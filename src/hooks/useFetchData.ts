import { useState, useEffect, useCallback } from "react";

type FetchResult<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
};

const useFetchData = <T>(
  fetchDataFunction: () => Promise<T>
): FetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const result = await fetchDataFunction();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error(String(err)));
      }
    } finally {
      setLoading(false);
    }
  }, [fetchDataFunction]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetchData;

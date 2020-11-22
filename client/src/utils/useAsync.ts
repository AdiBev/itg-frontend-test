import { useState, useEffect } from "react";

const useAsync = (fetchFunc: (url: string) => Promise<any>, apiUrl: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);

  const getData = async () => {
    try {
      setLoading(true);
      const apiData = await fetchFunc(apiUrl);
      setData(apiData);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return [data, error, loading];
};

export default useAsync;

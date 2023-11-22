import { useEffect, useState } from "react";

type UseFetch = (
  url: string,
  key?: string | number
) => {
  data: any;
  isPending: boolean;
  error: string | null;
};

const useFetch: UseFetch = (url, key = "default") => {
  const [data, setData] = useState({
    default: null,
  });
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data[key]) return;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((response) => {
        setData({
          ...data,
          [key]: response,
        });
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
  }, [key]);

  return {
    data: data[key],
    isPending,
    error,
  };
};

export default useFetch;

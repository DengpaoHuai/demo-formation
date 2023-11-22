import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((results) => {
        setData(results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refetch]);

  return {
    data,
    refetch: () => setRefetch(!refetch),
  };
};

export default useFetch;

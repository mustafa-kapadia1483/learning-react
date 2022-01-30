import { useState, useEffect } from "react";

// Customm hook
const useFetch = url => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // used for cleanup of the fetch request
    const abortController = new AbortController();
    setTimeout(() => {
      // by providing signal: abortController.signal option to fetch we associate it to our abortcontroller defined above
      fetch(url, { signal: abortController.signal })
        .then(res => {
          if (!res.ok) {
            throw Error("Could not fetch that resource");
          }
          return res.json();
        })
        .then(data => {
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch(err => {
          //  checking if the fetch is aborted and if so then not update the state of that component
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);
    // function to abort fetch request of an unmounted component
    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

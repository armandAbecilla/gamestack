import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send http request.',
    );
  }

  return resData;
}

// DO NOT PASS THE CONFIG AS EMPTY OBJECT LIKE {} IMPLICITLY. THIS WILL CAUSE INIFITE RE-RENDER
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    // by referencing the url parameter from this customHook to this fn that use useCallback,
    // we can still use this custom hook on fetching data with dynamic url via calling sendRequest
    async function sendRequest(requestUrl = url, data) {
      if (requestUrl === '' || requestUrl === undefined) {
        setError('Provide URL');
        return;
      }

      setIsLoading(true);

      try {
        const resData = await sendHttpRequest(requestUrl, {
          ...config,
          body: data,
        });
        setData(resData);

        // also return the resData, if for submitting post request or need to assign to a variable
        // ex: const resData = await useHttp(url, config);
        return resData;
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    },
    [url, config],
  );

  const shouldAutoSend =
    (config && config.method === 'GET') || !config.method || !config;

  useEffect(() => {
    // run this GET request if there is no method set in config or there is no config passed
    if (shouldAutoSend) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

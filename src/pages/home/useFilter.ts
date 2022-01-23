import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";


export default () => {
  const { isLoading, error, data } = useQuery("loadByFilter", () =>
    fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_APIKEY}&country=us`
    ).then((res) => res.json())
  );
  return {}
}
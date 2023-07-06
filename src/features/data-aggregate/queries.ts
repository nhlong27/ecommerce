import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const handleFetch = async () => {
  return (await axios.get('https://fakestoreapi.com/products')).data;
};

export const useGetMockDataQuery = (shouldFetch: boolean) => {
  return useQuery(['mock-products'], handleFetch, {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!shouldFetch,
  });
};

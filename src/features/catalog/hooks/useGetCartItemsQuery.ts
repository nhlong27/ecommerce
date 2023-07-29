import { useQuery } from "@tanstack/react-query";
import { getCartItemsQuery } from "../queries";

export const useGetCartItemsQuery = (email: string) => {
  return useQuery({ ...getCartItemsQuery(email) });
};
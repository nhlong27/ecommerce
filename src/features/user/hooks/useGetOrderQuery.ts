import { useQuery } from "@tanstack/react-query"
import { getOrderQuery } from "../queries"

export const useGetOrderQuery = (id: string) => {
  return useQuery({...getOrderQuery(id), enabled: !!id})
}

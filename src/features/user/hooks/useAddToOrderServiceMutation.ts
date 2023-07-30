import { useMutation } from "@tanstack/react-query"
import { addToOrderServiceMutationFn } from "../mutations"

export const useAddToOrderServiceMutation = () => {
  return useMutation({ mutationFn: addToOrderServiceMutationFn })
}

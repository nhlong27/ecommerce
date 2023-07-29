import { useMutation } from "@tanstack/react-query";
import { addToCartMutationFn } from "../mutations";

export const useAddToCartMutation = () => {
  return useMutation({ mutationFn: addToCartMutationFn});
}

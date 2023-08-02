import { useMutation } from "@tanstack/react-query";
import { cancelOrderMutationFn } from "../mutations";

export const useCancelOrderMutation = () => {
  return useMutation({ mutationFn: cancelOrderMutationFn });
}
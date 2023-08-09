import { useMutation } from '@tanstack/react-query';
import { deleteCartItemMutationFn } from '../mutations';

export const useDeleteCartItemMutation = () => {
  return useMutation({ mutationFn: deleteCartItemMutationFn });
};

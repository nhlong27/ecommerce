import { useMutation } from '@tanstack/react-query';
import { updateProductMutationFn } from '../mutations';

export const useUpdateProductMutation = () => {
  return useMutation({ mutationFn: updateProductMutationFn });
};

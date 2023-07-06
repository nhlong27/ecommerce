
import { useMutation} from '@tanstack/react-query';
import { addProductMutationFn } from '../mutations';

export const useAddProductMutation = () => {
  return useMutation({ mutationFn: addProductMutationFn});
};

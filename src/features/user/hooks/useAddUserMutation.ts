import { useMutation } from '@tanstack/react-query';
import { addUserMutationFn } from '../mutations';

export const useAddUserMutation = () => {
  return useMutation({ mutationFn: addUserMutationFn });
};

import { useMutation } from '@tanstack/react-query';
import { updateUserMutationFn } from '../mutations';

export const useUpdateUserMutation = () => {
  return useMutation({ mutationFn: updateUserMutationFn });
};

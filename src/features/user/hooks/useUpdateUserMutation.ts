
import { useMutation } from '@tanstack/react-query';
import { updateUserMutationFn } from '../mutations';

export const useGetUsersQuery = () => {
  return useMutation({mutationFn: updateUserMutationFn});
};

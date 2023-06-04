import {  updateUserMutationFn } from '@/mutations'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserMutationFn, mutationKey: ['updateUser'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    });
}

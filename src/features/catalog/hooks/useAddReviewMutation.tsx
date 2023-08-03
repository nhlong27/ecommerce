import { useMutation } from '@tanstack/react-query';
import { addReviewMutationFn } from '../mutations';

export const useAddReviewMutation = () => {
  return useMutation({ mutationFn: addReviewMutationFn });
};

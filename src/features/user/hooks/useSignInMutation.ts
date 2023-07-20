import { useMutation } from '@tanstack/react-query';
import {  signInMutationFn } from '../mutations';

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signInMutationFn });
};

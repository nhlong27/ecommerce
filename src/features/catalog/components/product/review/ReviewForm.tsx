'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { useAddReviewMutation } from '@/features/catalog/hooks/useAddReviewMutation';
import { useSession } from 'next-auth/react';
import { ProductType } from '@/features/catalog/types';
import { Session } from 'next-auth';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProductMutation } from '@/features/catalog/hooks/useUpdateProductMutation';

const FormSchema = z.object({
  rating: z.string(),
  review: z
    .string()
    .min(3, {
      message: 'Review must be at least 3 characters.',
    })
    .max(100, {
      message: 'Review must not be longer than 100 characters.',
    }),
});

export default function ReviewForm({
  product,
  session,
}: {
  product: ProductType;
  session: Session;
}) {
  const addReviewMutation = useAddReviewMutation();
  const updateProductMutation = useUpdateProductMutation();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    addReviewMutation.mutate(
      {
        productId: product.sku,
        userEmail: session.user.email,
        rating: parseInt(data.rating),
        description: data.review,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Add review successfully',
            description: "Product's ratings have been updated",
          });
          queryClient.invalidateQueries(['reviews', product.sku]);
          queryClient.invalidateQueries(['product', product.sku]);
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: 'Command failed',
            description: 'Check console for error message',
            variant: 'destructive',
          });
        },
      },
    );
    // updateProductMutation.mutate(
    //   {
    //     productId: product.sku,
    //     score: product.score + parseInt(data.rating) / (product.n_o_reviews + 1),
    //     n_o_reviews: product.n_o_reviews + 1,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       console.log(data);
    //       toast({ title: 'Updated product', description: JSON.stringify(data) });
    //       queryClient.invalidateQueries(['product', product.sku]);
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //       toast({
    //         title: 'Command failed',
    //         description: 'Check console for error message',
    //         variant: 'destructive',
    //       });
    //     },
    //   },
    // );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 mt-8 space-y-6'>
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select a rating' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='5'>5 (Excellent)</SelectItem>
                  <SelectItem value='4'>4 (Very good)</SelectItem>
                  <SelectItem value='3'>3 (Good)</SelectItem>
                  <SelectItem value='2'>2 (Bad)</SelectItem>
                  <SelectItem value='1'>1 (Awful)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='review'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us what you think about the product.'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

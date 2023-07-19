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

const FormSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z
    .string()
    .min(3, {
      message: 'Review must be at least 3 characters.',
    })
    .max(100, {
      message: 'Review must not be longer than 100 characters.',
    }),
});

export default function ReviewForm() {
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

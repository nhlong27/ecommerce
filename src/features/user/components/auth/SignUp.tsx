import React from 'react';
import { Input } from '@/components/ui/input';
import { useAddUserMutation } from '../../hooks/useAddUserMutation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/router';

const SignUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: 'Username must be at least 3 characters.',
      })
      .max(20, {
        message: 'Username must not be longer than 20 characters.',
      }),
    email: z.string().email({ message: 'Invalid email.' }),
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
    confirmPassword: z.string().min(3),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'The passwords did not match',
      });
    }
  });

const SignUp = () => {
  const addUserMutation = useAddUserMutation();
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
  });
  const router = useRouter()

  function onSubmit(data: z.infer<typeof SignUpFormSchema>) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //       <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    addUserMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: 'User successfully created',
        });
        router.push('/auth')
      },
      onError: (error) => {
        console.log(error);
        toast({
          title: 'User creation failed',
          description: error.response.errors[0].message,
        });
      },
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Enter your credentials.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          {/* <form method='post' action='/api/auth/callback/credentials'> */}

          <CardContent className='space-y-2'>
            {/* <Input name='csrfToken' type='hidden' defaultValue={csrfToken} /> */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Longnguyen' {...field} />
                  </FormControl>
                  <FormDescription>
                    How will you be perceived and <span>mentioned</span> by other users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='long@mail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Sign in</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignUp;
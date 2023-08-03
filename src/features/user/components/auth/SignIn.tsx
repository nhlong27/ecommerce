import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import * as auth from 'next-auth/react';

const SignInFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(3, {
    message: 'Password must be at least 3 characters.',
  }),
});

const SignIn = () => {
  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
  });
  function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    auth
      .signIn('credentials', { email: data.email, password: data.password, redirect: false })
      .then((response) => {
        if (response?.ok) {
          toast({ title: 'Sign in successfully'});
          // window.location.replace('/account');
          window.history.back();
        } else {
          console.log(response);
          toast({ title: 'Sign in failed', description: 'No matching credentials', variant: 'destructive'});
        }
      });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your credentials.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <CardContent className='space-y-2'>
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
          </CardContent>
          <CardFooter>
            <Button type='submit'>Sign in</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignIn;

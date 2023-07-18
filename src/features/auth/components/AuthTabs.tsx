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
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInWithProviders from './SignInWithProviders';
import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '@/pages/auth';

export default function AuthTabs({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Tabs defaultValue='account' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='account'>Sign in</TabsTrigger>
        <TabsTrigger value='password'>Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value='account'>
        <Card>
          <form method='post' action='/api/auth/callback/credentials'>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your credentials or choose a provider.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Input name='csrfToken' type='hidden' defaultValue={csrfToken} />

                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='nhlong@mail.com' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' placeholder='****' />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit'>Sign in</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value='password'>
        <Card>
          <form method='post' action='/api/auth/callback/credentials'>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Enter your email and password. Or choose a provider.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <Label htmlFor='email'>Email</Label>
                <Input id='email' placeholder='nhlong@mail.com' />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password'>Password</Label>
                <Input id='password' type='password' placeholder='****' />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit'>Sign up</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function AuthTabs() {
  return (
    <Tabs defaultValue='sign-in' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='sign-in'>Sign in</TabsTrigger>
        <TabsTrigger value='sign-up'>Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value='sign-in'>
        <SignIn />
      </TabsContent>
      <TabsContent value='sign-up'>
        <SignUp />
      </TabsContent>
    </Tabs>
  );
}

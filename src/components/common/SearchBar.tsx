import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { brand, ...rest } = router.query;
        router.push({
          pathname: router.pathname,
          query: { ...rest, keyword: e.currentTarget.query.value },
        });
        toast({ title: 'Searched for: ' + e.currentTarget.query.value });
      }}
      className='flex w-full max-w-sm items-center space-x-2'
    >
      <Input
        type='text'
        name='query'
        className='bg-blue-50'
        placeholder={`${router.query.keyword ?? 'Find a product'}`}
      />
      <Button type='submit' variant='default' className=''>Search</Button>
    </form>
  );
};

export default SearchBar;

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { queryAtom } from '@/pages/catalogue/[[...slug]]';
import { useAtom } from 'jotai';
import { toast } from '../ui/use-toast';

const SearchBar = () => {
  const [query, setQuery] = useAtom(queryAtom);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setQuery(e.currentTarget.query.value);
        toast({ title: 'Searched for: ' + query });
      }}
      className='flex w-full max-w-sm items-center space-x-2'
    >
      <Input type='text' name='query' className='bg-blue-50' placeholder='Find a product' />
      <Button type='submit'>Search</Button>
    </form>
  );
};

export default SearchBar;

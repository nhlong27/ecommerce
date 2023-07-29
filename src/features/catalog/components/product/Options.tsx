import { Text } from '@/components/common/Text';
import { Button } from '@/components/ui/button';
import React from 'react';

const Options = () => {
  const [amount, setAmount] = React.useState(1);
  return (
    <form className='mt-10'>
      <div className='flex items-center justify-start'>
        <Text variant='lg/normal/ghost' className='mr-4'>
          Amount:
        </Text>
        <Button
          disabled={amount <= 1}
          variant='secondary'
          size='icon'
          onClick={(e) => {
            e.preventDefault();
            setAmount((prev) => prev - 1);
          }}
        >
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </Button>
        <Text variant='lg/normal/black' className='mx-4'>
          {amount}
        </Text>
        <Button
          variant='secondary'
          size='icon'
          onClick={(e) => {
            e.preventDefault();
            setAmount((prev) => prev + 1);
          }}
        >
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </Button>
      </div>

      <Button
        type='submit'
        variant='default'
        size='lg'
        className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent2 text-base font-medium text-white bg-primary hover:bg-primary/70 dark:bg-secondary dark:hover:bg-secondary/70 dark:border-transparent'
      >
        Add to cart
      </Button>
    </form>
  );
};

export default Options;

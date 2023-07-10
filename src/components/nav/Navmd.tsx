import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Navmd = React.forwardRef<HTMLDivElement>(({}, ref) => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-start items-center min-h-screen w-full mt-20 gap-8'>
      <div
        className={`inline-flex tracking-wider items-center w-full justify-start p-3 transition-full duration-300`}
      >
        <svg
          width='22'
          height='22'
          viewBox='0 0 15 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z'
            fill='currentColor'
            fill-rule='evenodd'
            clip-rule='evenodd'
          ></path>
        </svg>
      </div>
      <Link
        className={`inline-flex items-center w-full justify-start p-3 transition-full duration-300 ${
          router.pathname === '/' ? 'text-primary border-r-2 border-primary' : 'text-neutral/30'
        }`}
        href='/'
      >
        Home
      </Link>
      <div
        className={`inline-flex tracking-wider items-center w-full text-black/70 justify-start p-3  transition-full duration-300 `}
      >
        <h1>Catalogue</h1>
      </div>
      <Link
        className={`inline-flex items-center w-full justify-start p-3 transition-full duration-300 ${
          router.pathname === '/about'
            ? 'text-primary border-r-2 border-primary'
            : 'text-neutral/30'
        }`}
        href='/about'
      >
        About
      </Link>
    </div>
  );
});

export default Navmd;

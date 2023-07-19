import React from 'react';

const BreadCrumbs = ({ routerQueries }: { routerQueries: string[] }) => {
  return (
    <nav aria-label='Breadcrumb' className='w-full py-4'>
      <ol
        role='list'
        className='mx-auto flex max-w-2xl items-center space-x-2 px-4 lg:max-w-7xl'
      >
        <li>
          <div className='flex items-center'>
            <a href='#' className='text-sm font-medium'>
              Home
            </a>
          </div>
        </li>
        {routerQueries.map((name: string, index: number) => (
          <li key={index}>
            <div className='flex items-center'>
              <svg
                width='16'
                height='20'
                viewBox='0 0 16 20'
                fill='currentColor'
                aria-hidden='true'
                className='h-5 w-4 '
              >
                <path d='M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z' />
              </svg>
              <a
                href='#'
                className={`ml-2 text-sm font-medium capitalize ${
                  routerQueries.at(-1) === name ? 'text-secondary' : ''
                }`}
              >
                {name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;

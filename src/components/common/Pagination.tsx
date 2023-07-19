import React from 'react';

const Pagination = () => {
  return (
    <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-500 mt-5 px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-500 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800'
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-500 e px-4 py-2 text-sm font-medium  dark:hover:bg-gray-800 hover:bg-gray-50'
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm '>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>10</span> of <span className='font-medium'>97</span>{' '}
            results{' '}
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
            <a
              href='#'
              aria-current='page'
              className='relative z-10 inline-flex items-center bg-primary/70 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30'
            >
              1
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
            >
              2
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
            >
              3
            </a>
            <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'>
              ...
            </span>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
            >
              8
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
            >
              9
            </a>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
            >
              10
            </a>
            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Next</span>
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clipRule='evenodd'
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

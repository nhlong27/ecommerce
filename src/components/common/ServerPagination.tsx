import { useSearchParams, usePathname } from 'next/navigation';
import {useRouter} from 'next/router'
import React from 'react';
import { Button } from '../ui/button';

interface ServerPaginationProps {
  dataLength: number;
}

export default function ServerPagination({ dataLength }: ServerPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const page = searchParams.get('page') ?? '1';
  return (
    <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-300 px-4 py-3 sm:px-6 text-black dark:text-white'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <Button
          onClick={() =>
            router.push({
              pathname: pathName,
              query: { ...router.query, page: Number(page) - 1 },
            })
          }
          className='relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 text-black dark:text-white'
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            router.push({
              pathname: pathName,
              query: { ...router.query, page: Number(page) + 1 },
            })
          }
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium hover:bg-gray-50 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 text-black dark:text-white'
        >
          Next
        </Button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm'>
            Showing <span className='font-medium'>{1+ (Number(page)-1)*12}</span> to{' '}
            <span className='font-medium'>
              {Number(page) * 12 > dataLength ? dataLength : Number(page) * 12}
            </span>{' '}
            of <span className='font-medium'>{dataLength}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <Button
              onClick={() =>
                router.push({
                  pathname: pathName,
                  query: { ...router.query, page: Number(page) - 1 },
                })
              }
              className='relative inline-flex items-center rounded-l-md rounded-r-none px-2 py-2  ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 text-black dark:text-white hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
            {Array(Math.ceil(dataLength / 12))
              .fill(0)
              .map((_, i) => (
                <Button
                  key={i}
                  className={`relative hidden rounded-none items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 md:inline-flex text-black dark:text-white ${
                    Number(page) === i + 1 ? 'bg-blue-400 focus-visible:outline-blue-400 hover:bg-blue-300 dark:bg-blue-400 dark:hover:bg-blue-300' : 'bg-white dark:bg-slate-900 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => router.push({
                    pathname: pathName,
                    query: { ...router.query, page: i+1 },
                  })}
                >
                  {i + 1}
                </Button>
              ))}

            <Button
              onClick={() =>
                router.push({
                  pathname: pathName,
                  query: { ...router.query, page: Number(page) + 1 },
                })
              }
              className='relative inline-flex items-center rounded-r-md rounded-l-none px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-white dark:bg-slate-900 dark:hover:bg-slate-800 text-black dark:text-white'
            >
              <span className='sr-only'>Next</span>
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clipRule='evenodd'
                />
              </svg>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}

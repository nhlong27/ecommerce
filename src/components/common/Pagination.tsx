import div from 'next/link';
import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  dataLength: number;
  pageCount: number;
  handlePageClick: (event: any) => void;
};

const Pagination: React.FC<PaginationProps> = ({ dataLength, pageCount, handlePageClick }) => {
  
  return (
    <div className='flex items-center justify-between border-t border-gray-200 dark:border-gray-500 mt-5 px-4 py-3 sm:px-6'>
      <div className='w-full flex items-center'>
        <div className='hidden lg:block'>
          <p className='text-sm '>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>10</span> of{' '}
            <span className='font-medium'>{dataLength}</span> results{' '}
          </p>
        </div>
        <ReactPaginate
          breakLabel={
            <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'>
              ...
            </span>
          }
          nextLabel={
            <div
              className='relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
            >
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          }
          containerClassName='sm:flex flex-wrap inline-flex -space-x-px rounded-md shadow-sm lg:ml-auto mx-auto lg:mr-0 '
          pageClassName='relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 dark:ring-gray-500 focus:z-20 focus:outline-offset-0'
          activeClassName='relative z-10 inline-flex items-center bg-primary/70 px-4 py-2 text-sm font-semibold text-white hover:text-black focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/30'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={
            <div
              className='relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 dark:ring-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus:z-20 focus:outline-offset-0'
            >
              <svg className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          }
          renderOnZeroPageCount={null}
          aria-label='Pagination'
        />
      </div>
    </div>
  );
};

export default Pagination;

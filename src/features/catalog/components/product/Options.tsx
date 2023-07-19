import React from 'react';

const Options = () => {
  return (
    <form className='mt-10'>
      <div>
        <h3 className='text-sm font-medium '>Color</h3>

        <fieldset className='mt-4'>
          <legend className='sr-only'>Choose a color</legend>
          <div className='flex items-center space-x-3'>
            <label className='relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400'>
              <input
                type='radio'
                name='color-choice'
                value='White'
                className='sr-only'
                aria-labelledby='color-choice-0-label'
              />
              <span id='color-choice-0-label' className='sr-only'>
                White
              </span>
              <span
                aria-hidden='true'
                className='h-8 w-8 bg-white rounded-full border border-black border-opacity-10'
              ></span>
            </label>

            <label className='relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-400'>
              <input
                type='radio'
                name='color-choice'
                value='Gray'
                className='sr-only'
                aria-labelledby='color-choice-1-label'
              />
              <span id='color-choice-1-label' className='sr-only'>
                Gray
              </span>
              <span
                aria-hidden='true'
                className='h-8 w-8 bg-gray-200 dark:bg-gray-500 rounded-full border border-black border-opacity-10'
              ></span>
            </label>

            <label className='relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900'>
              <input
                type='radio'
                name='color-choice'
                value='Black'
                className='sr-only'
                aria-labelledby='color-choice-2-label'
              />
              <span id='color-choice-2-label' className='sr-only'>
                Black
              </span>
              <span
                aria-hidden='true'
                className='h-8 w-8 bg-gray-900 dark:border-gray-500 rounded-full border border-black border-opacity-10'
              ></span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className='mt-10'>
        <div className='flex items-center justify-between'>
          <h3 className='text-sm font-medium '>Size</h3>
          <a href='#' className='text-sm font-medium text-primary dark:text-secondary hover:text-primary/70 dark:hover:text-secondary/70'>
            Size guide
          </a>
        </div>

        <fieldset className='mt-4'>
          <legend className='sr-only'>Choose a size</legend>
          <div className='grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4'>
            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200'>
              <input
                type='radio'
                name='size-choice'
                value='XXS'
                disabled
                className='sr-only'
                aria-labelledby='size-choice-0-label'
              />
              <span id='size-choice-0-label'>XXS</span>
              <span
                aria-hidden='true'
                className='pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200'
              >
                <svg
                  className='absolute inset-0 h-full w-full stroke-2 text-gray-200'
                  viewBox='0 0 100 100'
                  preserveAspectRatio='none'
                  stroke='currentColor'
                >
                  <line x1='0' y1='100' x2='100' y2='0' vector-effect='non-scaling-stroke' />
                </svg>
              </span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='XS'
                className='sr-only'
                aria-labelledby='size-choice-1-label'
              />
              <span id='size-choice-1-label'>XS</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='S'
                className='sr-only'
                aria-labelledby='size-choice-2-label'
              />
              <span id='size-choice-2-label'>S</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='M'
                className='sr-only'
                aria-labelledby='size-choice-3-label'
              />
              <span id='size-choice-3-label'>M</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='L'
                className='sr-only'
                aria-labelledby='size-choice-4-label'
              />
              <span id='size-choice-4-label'>L</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='XL'
                className='sr-only'
                aria-labelledby='size-choice-5-label'
              />
              <span id='size-choice-5-label'>XL</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='2XL'
                className='sr-only'
                aria-labelledby='size-choice-6-label'
              />
              <span id='size-choice-6-label'>2XL</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>

            <label className='group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm'>
              <input
                type='radio'
                name='size-choice'
                value='3XL'
                className='sr-only'
                aria-labelledby='size-choice-7-label'
              />
              <span id='size-choice-7-label'>3XL</span>

              <span
                className='pointer-events-none absolute -inset-px rounded-md'
                aria-hidden='true'
              ></span>
            </label>
          </div>
        </fieldset>
      </div>
      <button
        type='submit'
        className='mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-primary dark:bg-secondary px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
      >
        Add to bag
      </button>
    </form>
  );
};

export default Options;

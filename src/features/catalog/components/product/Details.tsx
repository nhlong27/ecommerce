import React from 'react';

const Details = () => {
  return (
    <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 dark:border-gray-500 lg:pb-16 lg:pr-8 lg:pt-6'>
      <div>
        <h3 className='sr-only'>Description</h3>

        <div className='space-y-6'>
          <p className='text-base'>
            The Basic Tee 6-Pack allows you to fully express your vibrant personality with three
            grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a
            trendsetter? Try our exclusive colorway: &quot;Black&quot;. Need to add an extra pop of
            color to your outfit? Our white tee has you covered.
          </p>
        </div>
      </div>

      <div className='mt-10'>
        <h3 className='text-sm font-medium '>Highlights</h3>

        <div className='mt-4'>
          <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
            <li className=''>
              <span className=''>Hand cut and sewn locally</span>
            </li>
            <li className=''>
              <span className=''>Dyed with our proprietary colors</span>
            </li>
            <li className=''>
              <span className=''>Pre-washed &amp; pre-shrunk</span>
            </li>
            <li className=''>
              <span className=''>Ultra-soft 100% cotton</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-sm font-medium '>Details</h2>

        <div className='mt-4 space-y-6'>
          <p className='text-sm '>
            The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for
            our subscription service and be the first to get new, exciting colors, like our upcoming
            &quot;Charcoal Gray&quot; limited release.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;

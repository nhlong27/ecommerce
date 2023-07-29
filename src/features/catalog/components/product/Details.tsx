import React from 'react';
import { ProductType } from '../../types';

const Details = ({ product }: { product: ProductType }) => {
  return (
    <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 dark:border-gray-500 lg:pb-16 lg:pr-8 lg:pt-6'>
      <div>
        <h3 className='sr-only'>Description</h3>

        <div className='space-y-6'>
          <p className='text-base'>
            {`
          This iconic drink is crafted from high-quality ingredients, carefully brewed to extract the full flavor profile, resulting in a satisfying and thirst-quenching experience with every sip. ${product.title} is known for its crisp and clean taste, making it a favorite among tea enthusiasts and those looking for a low-calorie and refreshing option.

          `}
          </p>
        </div>
      </div>

      <div className='mt-10'>
        <h3 className='text-sm font-medium '>Highlights</h3>

        <div className='mt-4'>
          <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
            <li className=''>
              <span className=''>Expertly crafted for an unparalleled taste experience</span>
            </li>
            <li className=''>
              <span className=''>Sourced from the finest, natural ingredients</span>
            </li>
            <li className=''>
              <span className=''>Thoughtfully infused with essential nutrients for your well-being</span>
            </li>
            <li className=''>
              <span className=''>Prepared with precision for consistent taste in every sip</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-sm font-medium '>Details</h2>

        <div className='mt-4 space-y-6'>
          <p className='text-base text-gray-500 dark:text-gray-400'>
            {`Packaged in convenient sizes, including bottles and cans, ${product.title} is the perfect companion for on-the-go moments, outdoor adventures, and gatherings with family and friends. With its invigorating taste and distinctive branding, this has become a beloved classic in the world of beverages, capturing the hearts of tea enthusiasts and offering a delightful way to quench your thirst.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;

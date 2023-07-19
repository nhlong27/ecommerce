import React from 'react'
import Review from './Review'

const Reviews = () => {
  return (
    <div className='w-full flex flex-col divide-y-2 divide-y-gray-200  dark:divide-y-gray-900 dark:divide-y-[1px]'>
      <Review />
      <Review />
      <Review />
    </div>
  )
}

export default Reviews
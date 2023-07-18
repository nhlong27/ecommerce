import React from 'react';
import { LineWave } from 'react-loader-spinner';

const LoadingPage = () => {
  console.log('Loading');
  return (
    <div className='flex min-h-dynamic-screen w-full justify-center items-center'>
      <LineWave color='blue' />
    </div>
  );
};

export default LoadingPage;

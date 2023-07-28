import React from 'react';
import { LineWave } from 'react-loader-spinner';

const LoadingPage = () => {
  return (
    <div className='flex min-h-dynamic-screen w-full justify-center items-center'>
      <LineWave color='#0369a1' />
    </div>
  );
};

export default LoadingPage;

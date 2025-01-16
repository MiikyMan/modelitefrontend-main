import React from 'react';

const InternalError = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold text-red-600'>500</h1>
        <p className='mt-4 text-2xl'>Internal Server Error</p>
        <p className='mt-2 text-gray-600'>Something went wrong on our end. Please try again later.</p>
      </div>
    </div>
  );
};

export default InternalError;

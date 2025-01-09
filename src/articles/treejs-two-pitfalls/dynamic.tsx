'use client';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
export const ExampleModel = dynamic(
  () => import(/*ExampleModel*/ './exampleModel'),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100%',
          height: window.innerWidth > 768 ? '357px' : '61vw',
        }}
        className='flex justify-center items-center'
      >
        <SpinnerLoading />
      </div>
    ),
  }
);

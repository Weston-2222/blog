'use client';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
export const ExampleModel = dynamic(
  () => import(/*ExampleModel*/ './exampleModel'),
  {
    ssr: false,
    loading: () => (
      <SpinnerLoading className='md:w-[600px] md:h-[300px] h-[210px]' />
    ),
  }
);

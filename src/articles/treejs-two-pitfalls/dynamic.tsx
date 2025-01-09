'use client';
import dynamic from 'next/dynamic';
import './articleCar.css';
import SpinnerLoading from '@/components/spinnerLoading';
export const ExampleModel = dynamic(
  () => import(/*ExampleModel*/ './exampleModel'),
  {
    ssr: false,
    loading: () => (
      <div className='flex justify-center items-center container'>
        <SpinnerLoading />
      </div>
    ),
  }
);

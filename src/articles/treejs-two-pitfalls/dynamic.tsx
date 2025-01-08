'use client';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
export const ExampleModel = dynamic(
  () => import(/*ExampleModel*/ './exampleModel'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className=' w-full h-[50vw]' />,
  }
);

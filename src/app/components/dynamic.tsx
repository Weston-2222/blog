'use client';
import dynamic from 'next/dynamic';
import SpinnerLoading from '@/components/spinnerLoading';
export const ResumeBlock = dynamic(
  () => import(/*ResumeBlock*/ './resumeBlock'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className='w-[350px]  h-[156px] tb-4' />,
  }
);

export const CryptoWebsite = dynamic(
  () => import(/*CryptoWebsite*/ './cryptoWebsite'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className='w-[350px] h-[156px] tb-4' />,
  }
);

export const CatModel = dynamic(() => import(/*CatModel*/ './catModel'), {
  ssr: false,
  loading: () => {
    return (
      <SpinnerLoading className='md:w-[600px] w-[300px] md:h-[300px] h-[50vw] tb-4' />
    );
  },
});

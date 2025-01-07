'use client';
import dynamic from 'next/dynamic';
import Loading from '@/components/spinnerLoading';
export const ResumeBlock = dynamic(
  () => import(/*ResumeBlock*/ './resumeBlock'),
  {
    ssr: false,
    loading: () => <Loading className='w-[350px]  h-[156px]' />,
  }
);

export const CryptoWebsite = dynamic(
  () => import(/*CryptoWebsite*/ './cryptoWebsite'),
  {
    ssr: false,
    loading: () => <Loading className='w-[350px] h-[156px]' />,
  }
);

export const CatModel = dynamic(() => import(/*CatModel*/ './catModel'), {
  ssr: false,
  loading: () => {
    return <Loading className='md:w-[750px] md:h-[360px] w-full h-[48vw]' />;
  },
});

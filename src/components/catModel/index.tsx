'use client';
import 'client-only';

import dynamic from 'next/dynamic';

const CatModel = dynamic(
  () =>
    import(/* webpackChunkName:"CatModel" */ '@/components/catModel/catModel'),
  {
    ssr: false,
    loading: () => (
      <div className='flex justify-center items-center md:h-[360px] h-[250px] w-full'>
        <div className='h-[100px] w-[100px] inline-block border-8 border-solid border-gray-200 rounded-full border-t-blue-500 animate-spin'></div>
      </div>
    ),
  }
);

const Cat = () => {
  return <CatModel />;
};

export default Cat;

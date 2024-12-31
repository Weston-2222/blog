'use client';
import 'client-only';

import dynamic from 'next/dynamic';
import SpinnerLoading from '../spinnerLoading';

const CatModel = dynamic(
  () =>
    import(/* webpackChunkName:"CatModel" */ '@/components/catModel/catModel'),
  {
    ssr: false,
    loading: () => <SpinnerLoading className='h-[360px] w-full' />,
  }
);

const Cat = () => {
  return <CatModel />;
};

export default Cat;

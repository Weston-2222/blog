import dynamic from 'next/dynamic';

const CatModel = dynamic(
  () =>
    import(/* webpackChunkName:"CatModel" */ '@/components/catModel/catModel'),
  {
    loading: () => (
      <div className='flex justify-center items-center h-[300px] w-full'>
        <div className='h-[100px] w-[100px] inline-block border-8 border-solid border-gray-200 rounded-full border-t-blue-500 animate-spin'></div>
      </div>
    ),
  }
);
const page = () => {
  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        <CatModel />
      </div>
      <div className='text-center text-2xl'>這裡之後會有一些東西</div>
    </div>
  );
};

export default page;

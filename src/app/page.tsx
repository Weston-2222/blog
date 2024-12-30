import dynamic from 'next/dynamic';

const CatModel = dynamic(
  () =>
    import(/* webpackChunkName:"CatModel" */ '@/components/catModel/catModel'),
  {
    loading: () => (
      <div className='flex justify-center items-center h-[500px] w-[500px]'>
        <div className='h-[100px] w-[100px] inline-block border-8 border-solid border-gray-200 rounded-full border-t-blue-500 animate-spin'></div>
      </div>
    ),
  }
);
const page = () => {
  return (
    <div>
      <CatModel />
    </div>
  );
};

export default page;

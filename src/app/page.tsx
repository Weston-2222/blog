// import dynamic from 'next/dynamic';

// const CatModel = dynamic(
//   () =>
//     import(/* webpackChunkName:"CatModel" */ '@/components/catModel/catModel'),
//   {
//     loading: () => (
//       <div className='flex justify-center items-center h-[300px] w-full'>
//         <div className='h-[100px] w-[100px] inline-block border-8 border-solid border-gray-200 rounded-full border-t-blue-500 animate-spin'></div>
//       </div>
//     ),
//   }
// );
const page = () => {
  return (
    <div>
      {/* <CatModel /> */}
      網站架設中
    </div>
  );
};

export default page;

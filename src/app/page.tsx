import Articles from './components/articles';
import { CatModel, ResumeBlock, CryptoWebsite } from './components/dynamic';

export const metadata = {
  title: "Weston's Blog",
};

const page = async () => {
  return (
    <div className='pb-4'>
      <div className='flex justify-center items-center w-full'>
        <CatModel />
      </div>
      <div className='flex flex-wrap justify-center items-center gap-4 max-w-[750px]'>
        <ResumeBlock className='w-[350px]' />
        <CryptoWebsite className='w-[350px]' />
        <Articles className='w-[350px]' />
      </div>
    </div>
  );
};

export default page;

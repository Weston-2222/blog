import Articles from './components/articles';
import { CatModel, ResumeBlock, CryptoWebsite } from './components/dynamic';

export const metadata = {
  title: "Weston's Blog",
};

const page = () => {
  return (
    <div className='pb-4 flex flex-col items-center justify-center'>
      <div className='flex justify-center items-center w-full'>
        <CatModel />
      </div>

      <div className='flex flex-wrap justify-center items-center gap-4 max-w-[800px]'>
        <ResumeBlock />
        <CryptoWebsite />
        <Articles />
      </div>
    </div>
  );
};

export default page;

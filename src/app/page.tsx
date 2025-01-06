import Articles from '@/components/articles';
import Cat from '@/components/catModel';
import CryptoWebsite from '@/components/homePage/cryptoWebsite';
import ResumeBlock from '@/components/homePage/resumeBlock';

export const metadata = {
  title: "Weston's Blog",
};

const page = async () => {
  return (
    <div className='h-screen'>
      <div className='flex justify-center items-center w-full'>
        <Cat />
      </div>
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <ResumeBlock className='w-[320px]' />{' '}
        <CryptoWebsite className='w-[320px]' />
      </div>
      <Articles />
    </div>
  );
};

export default page;

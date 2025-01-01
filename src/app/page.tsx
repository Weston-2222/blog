import Articles from '@/components/articles';
import Cat from '@/components/catModel';

const page = async () => {
  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        <Cat />
      </div>
      <div className='text-center text-2xl'>這裡之後會有一些東西</div>
      <Articles />
    </div>
  );
};

export default page;

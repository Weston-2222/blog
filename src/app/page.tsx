import Cat from '@/components/catModel';

const page = () => {
  return (
    <div>
      <div className='flex justify-center items-center w-full'>
        <Cat />
      </div>
      <div className='text-center text-2xl'>這裡之後會有一些東西</div>
    </div>
  );
};

export default page;

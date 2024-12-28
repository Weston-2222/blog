import CopyButton from '@/components/copyButton';

const Title = () => {
  return (
    <section>
      <header className='max-w-4xl mx-auto'>
        <div className='flex flex-row flex-wrap justify-between'>
          <div className='mb-6 md:mb-0'>
            <h1 className='text-4xl font-bold tracking-wide mb-1'>Weston</h1>

            <h2 className='text-xl font-medium text-gray-500 dark:text-gray-400'>
              謝子崴
            </h2>
          </div>

          <div className='space-y-1 text-sm md:text-base flex flex-col items-end ml-auto'>
            <div className='flex items-center gap-2'>
              <p>weston.workmail@gmail.com</p>
              <CopyButton
                command='weston.workmail@gmail.com'
                className='h-6 w-6'
              />
            </div>
            <p>
              <a
                href='https://westons.blog'
                className=''
                target='_blank'
                rel='noopener noreferrer'
              >
                <button className='rounded-md p-1'>westons.blog</button>
              </a>
            </p>
            <p className=''>中華科技大學航空電子系</p>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Title;

'use client';
import 'client-only';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);
  return (
    <div className='h-screen w-screen flex justify-center items-center text-center text-2xl'>
      發生不明錯誤，請稍後再試，3秒後返回首頁。
    </div>
  );
};

export default NotFound;

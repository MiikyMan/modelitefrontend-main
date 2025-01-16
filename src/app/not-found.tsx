'use client';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { AiOutlineArrowLeft, AiTwotoneExclamationCircle } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';

export default function Error404() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goHome = () => {
    router.push('/');
  };

  return (
    <section className='bg-white'>
      <div className='mx-auto flex items-center px-6 py-12'>
        <div className='mx-auto flex max-w-sm flex-col items-center text-center'>
          <p className='rounded-full bg-blue-50 p-3 text-3xl font-medium text-blue-500'>
            <AiTwotoneExclamationCircle />
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>Page not found</h1>
          <p className='mt-4 text-gray-500'>
            The page you are looking for doesn&apos;t exist.
            <br /> Here are some helpful links:
          </p>

          <div className='mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto'>
            <Button
              className='flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 sm:w-auto'
              onClick={() => goBack()}
            >
              <AiOutlineArrowLeft />
              <span>Go back</span>
            </Button>
            <Button
              className='w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-500'
              onClick={() => goHome()}
            >
              <BiHome />
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useRouter } from 'next/navigation';
import { getGoogleAuth } from '@/api/auth';
import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Modal } from 'antd';

export default function Home() {
  const router = useRouter();
  const LoginHandle = async () => {
    const url = await getGoogleAuth();
    if (url === null) {
      setIsModalOpen(true);
      return;
    }
    router.push(url);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='grid h-[100vh] content-center justify-center bg-purplebg'>
      <div className='flex w-full flex-col items-center justify-center gap-4 rounded-3xl bg-white px-16 py-8'>
        <div>
          <Image src='/logo.png' width={75} height={75} alt='logo' className='object-cover' />
        </div>
        <div className='flex flex-col items-center justify-center gap-7'>
          <div className='text-2xl font-bold'>ModÉlite</div>
          <div className='flex w-5/6 flex-wrap text-center'>Access all feature by signing in to your account here.</div>
          <button
            className='flex items-center justify-center gap-4 rounded-full stroke-gray1 px-20 py-4 shadow-lg shadow-gray-200 duration-300 hover:bg-gray-100/75'
            onClick={() => LoginHandle()}
          >
            <Image src='/Google.svg' width={25} height={25} alt='googleLogo' className='object-cover' />
            Continue with Google
          </button>
        </div>
      </div>
      <div className='absolute bottom-2 w-full text-center text-gray-500'>Copyright ©2020 Produced by Ant Finance Experience Technology Department</div>
      <Modal centered closable={false} open={isModalOpen} footer={[]}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <Image src='/info.svg' width={75} height={75} alt='warningLogo' className='object-cover' />
          <div className='text-2xl font-bold'>Login failed</div>
          <div className='text-lg'>The email failed in required.</div>
          <Button
            onClick={() => setIsModalOpen(false)}
            type='primary'
            style={{
              padding: '20px',
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  // console.log("props.orderList[0].id",props.orderList[0].id);
  return (
    <>
      <button className='text-purple1 transition duration-100 hover:text-[#9b8ff2]' onClick={() => router.back()}>
        back
      </button>
    </>
  );
};

export default BackButton;

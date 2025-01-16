'use server';

import NewSeller from '@/components/seller/SellerNew';

export default async function newseller() {
  return (
    <div className='h-svh w-svw bg-[#F5F6FB]'>
      <div className='mx-auto w-full content-center px-10 py-12 lg:max-w-235 lg:px-30'>
        <NewSeller />
      </div>
    </div>
  );
}

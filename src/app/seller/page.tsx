'use server';

import SellerList from '@/components/seller/SellerList';
import { getSellerByOwner } from '@/api/seller';

export default async function seller() {
  const seller_list = await getSellerByOwner();
  if (seller_list === null) {
    return;
  }

  return (
    <div className='h-svh w-svw bg-[#F5F6FB]'>
      <div className='mx-auto w-full content-center px-10 py-12 lg:max-w-260 lg:px-30'>
        <SellerList seller_list={seller_list} />
      </div>
    </div>
  );
}

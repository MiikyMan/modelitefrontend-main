'use server';

import AccountComponent from '@/components/seller/account/AccountComponent';
import { isSeller } from '@/api/seller';

interface IParmas {
  seller_id: string;
}

export default async function accouct({ params }: { params: IParmas }) {
  const seller_data = await isSeller(params.seller_id);
  if (typeof seller_data === 'boolean') {
    return;
  }

  return (
    <>
      <AccountComponent seller_id={params.seller_id} seller_data={seller_data} />
    </>
  );
}

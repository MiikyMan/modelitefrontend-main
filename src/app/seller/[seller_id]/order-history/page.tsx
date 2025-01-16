'use server';

import HistoryPage from '@/components/seller/history/HistoryPage';
import { getOrderHistory } from '@/api/seller';
import { redirect } from 'next/navigation';

interface IParmas {
  seller_id: string;
}

export default async function orderHistory({ params }: { params: IParmas }) {
  const orders = await getOrderHistory(params.seller_id);
  if (orders === null) {
    redirect('/login');
  }

  const temp = orders.map((item) => {
    return {
      ...item,
      status: item.status !== 'PENDING' ? item.status : 'PAYMENT_SUCCESS',
    };
  });

  return (
    <div className='h-fit w-full gap-y-6 rounded-2xl border'>
      <HistoryPage orders={temp} />
    </div>
  );
}

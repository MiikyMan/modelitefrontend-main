import OrderHistoryPage from '@/components/setting/order-history/OrderHistoryPage';
import { getOrderInfo } from '@/api/order';

export default async function OrderHistory() {
  const order = await getOrderInfo();
  if (typeof order === 'boolean') {
    return;
  }

  return (
    <>
      <div className='h-fit w-full gap-y-6 rounded-2xl border'>
        <OrderHistoryPage orders={order} />
      </div>
    </>
  );
}

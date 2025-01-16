import { IOrderList } from '@/interfaces/order';
import { FC } from 'react';
import OrderHistoryCard from './OrderHistoryCard';
import { HiInbox } from 'react-icons/hi';

interface IProps {
  filter: string;
  orders: IOrderList[];
}

const OrderHistoryList: FC<IProps> = (props) => {
  return (
    <>
      <div className='w-full'>
        {props.orders
          .filter((item) => item.status === props.filter || props.filter === '')
          .map((item) => {
            return <OrderHistoryCard key={item.id} status={item.status} orders={item} />;
          })}
        {props.orders.filter((item) => item.status === props.filter || props.filter === '').length === 0 ? (
          <div className='w-full p-16 text-gray-400'>
            <div className='mx-auto w-fit'>
              <HiInbox size={64} color='#e5e7eb' />
              <span>No data</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default OrderHistoryList;

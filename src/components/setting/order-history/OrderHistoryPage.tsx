'use client';

import { IOrderList } from '@/interfaces/order';
import { Button } from 'antd';
import OrderHistoryList from '@/components/setting/order-history/OrderHistoryList';
import React, { FC, useState } from 'react';

interface IProps {
  orders: IOrderList[];
}

const OrderHistoryPage: FC<IProps> = (props) => {
  const [filter, setFilter] = useState<string>('');
  const orders = props.orders.filter((item) => ['PAYMENT_SUCCESS', 'DELIVERY_ON_THE_WAY', 'REFUND', 'END', 'CANCEL'].includes(item.status));

  return (
    <>
      <div className='w-full p-4'>
        <span className='text-xl font-bold'>Order History</span>
      </div>
      <div className='w-[calc(100svw-3rem)] overflow-x-auto bg-purple4 sm:w-full'>
        <div className='flex w-fit flex-row font-bold lg:w-full lg:px-4'>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === ''
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('')}
          >
            All
          </Button>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === 'PAYMENT_SUCCESS'
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('PAYMENT_SUCCESS')}
          >
            To Ship
          </Button>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === 'DELIVERY_ON_THE_WAY'
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('DELIVERY_ON_THE_WAY')}
          >
            To Receive
          </Button>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === 'REFUND'
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('REFUND')}
          >
            Refund
          </Button>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === 'END'
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('END')}
          >
            Complete
          </Button>
          <Button
            type='primary'
            ghost
            size='small'
            style={
              filter === 'CANCEL'
                ? { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 2px 0px', borderRadius: '0px' }
                : { height: '50px', width: '120px', padding: '0px', borderWidth: '0px 0px 0px 0px', borderRadius: '0px' }
            }
            onClick={() => setFilter('CANCEL')}
          >
            Cancel
          </Button>
        </div>
      </div>

      <OrderHistoryList filter={filter} orders={orders} />
    </>
  );
};

export default OrderHistoryPage;

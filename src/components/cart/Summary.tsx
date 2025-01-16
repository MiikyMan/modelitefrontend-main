'use client';
import { IExtendedProduct } from '@/interfaces/cart';
import { Button } from 'antd';
import { calculateTotal, numberFormat } from '@/utils/format';
import React, { useEffect, useState } from 'react';

interface Props {
  my_item: IExtendedProduct[];
  disable: boolean;
  checkOut: () => void;
}
const Summary: React.FC<Props> = (props) => {
  const [Delivery, Setdelivery] = useState<number>(0);
  useEffect(() => {
    if (props.my_item.filter((item) => item.selected).length < 1) {
      Setdelivery(0);
    } else {
      Setdelivery(150);
    }
  }, [props.my_item]);

  return (
    <div>
      <div className='col-span-1 h-fit space-y-2 rounded-[20px] bg-gray-100'>
        <div className='mx-6'>
          <h1 className='py-3'>Order Summary</h1>
        </div>
        <hr className='mx-auto w-5/6 border-grayHr'></hr>
        <div className='mx-6 flex'>
          <h2 className='flex-1 text-gray1'>Subtotal</h2>
          <h2 className='flex-none'>{calculateTotal(0, props.my_item)}</h2>
        </div>
        <div className='mx-6 flex'>
          <h2 className='flex-1 text-gray1'>Delivery</h2>
          <h2 className='flex-none'>{numberFormat(Delivery)}</h2>
        </div>
        <hr className='mx-auto w-5/6 border-grayHr'></hr>
        <div className='mx-6 flex py-3 text-purple1'>
          <h2 className='flex-1 font-semibold'>Subtotal</h2>
          <h2 className='flex-none font-semibold'>{calculateTotal(Delivery, props.my_item)}</h2>
        </div>
        <hr className='mx-auto w-5/6 border-grayHr'></hr>
        <div className='py-6 text-center'>
          <Button size='large' type='primary' onClick={props.checkOut} disabled={props.disable}>
            Check out
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Summary;

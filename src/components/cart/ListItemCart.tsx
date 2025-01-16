'use client';
import { IExtendedProduct } from '@/interfaces/cart';
import { postAddCartItem } from '@/api/cart';
import { numberFormat } from '@/utils/format';
import { Button, Checkbox, ConfigProvider, List } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { IoAdd, IoClose, IoRemove } from 'react-icons/io5';
interface Props {
  cartItems: IExtendedProduct[] | null;
  setCartItems: React.Dispatch<React.SetStateAction<IExtendedProduct[]>>;
}
const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <p>No product in cart</p>
  </div>
);

const ListItemCart: React.FC<Props> = ({ cartItems, setCartItems }) => {
  const items = cartItems ?? [];
  const [selectAll, setSelectAll] = useState(false);

  const handleUpdatedata = async (id: string, quantity: number) => {
    const data = await postAddCartItem(id, quantity);
    const newdata = data ?? [];
    // Before update data set the selected to same as before and check for select all
    const selected = items.filter((item) => item.selected).map((item) => item.productSizeId);
    newdata.forEach((item) => {
      if (selected.includes(item.productSizeId)) {
        item.selected = true;
      }
    });
    setCartItems(newdata);
    setSelectAll(newdata.length === newdata.filter((item) => item.selected).length);
  };

  const handleSelectAll = (selectAll: boolean) => {
    const newitem = items.map((item) => ({ ...item, selected: selectAll }));
    setCartItems(newitem);
  };
  const handleItemSelect = (id: string) => {
    const updatedItems = items.map((item) => (item.productSizeId === id ? { ...item, selected: !item.selected } : item));
    setCartItems(updatedItems);
  };

  useEffect(() => {
    setSelectAll(items.length === items.filter((item) => item.selected).length);
  }, [items]);

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <div>
        <List
          style={{
            boxShadow: '0px 0px 0px',
          }}
          header={
            <div className='my-1 flex space-x-[15px]'>
              <Checkbox onChange={(e) => handleSelectAll(e.target.checked)} checked={selectAll}></Checkbox>
              <p className='text-[16px] font-semibold'>Select all</p>
            </div>
          }
          bordered
          dataSource={items}
          renderItem={(item) => (
            <List.Item className='my-3 border-b border-gray-300'>
              <div className='mb-6 w-full'>
                <div className='flex place-items-start'>
                  <Checkbox className='flex-none' onChange={() => handleItemSelect(item.productSizeId)} checked={item.selected} />
                  <div className='mx-0 flex-1 space-y-3'>
                    <div className='flex'>
                      <p className='flex-1 px-6 text-[16px]'>{item.product.seller}</p>
                      <Button size='small' className='order-last flex-none' onClick={() => handleUpdatedata(item.productSizeId, 0)}>
                        <IoClose />
                      </Button>
                    </div>
                    <div className='flex w-full md:flex-1 md:space-x-4'>
                      <div className='px-6 md:flex-grow-0'>
                        <Image width={150} height={100} className='rounded-[15px] object-cover md:h-32' src={item.product.product_image} alt='' />
                      </div>

                      <div className='flex-grow'>
                        <h2 className='text-[13px] font-semibold md:text-[16px]'>{item.product.productName}</h2>

                        <div className='my-3 space-y-[6-px]'>
                          <h4 className='text-[13px] text-gray1 md:text-[16px]'>
                            {item.product.productDescription.length > 50
                              ? item.product.productDescription.slice(0, 50) + '...'
                              : item.product.productDescription}
                          </h4>
                          <h4 className='text-[13px] md:text-[16px]'>
                            Color:
                            <span className='text-[13px] text-gray1 md:text-[16px]'> {item.product.productOption}</span>
                          </h4>

                          <h4 className='text-[13px] md:text-[16px]'>
                            Size: <span className='text-[13px] text-gray1 md:text-[16px]'>{item.product.size}</span>
                          </h4>
                        </div>

                        <div className='flex place-items-center md:space-x-7'>
                          <div className='inline-block flex-1'>
                            <p className='inline-block text-[11px] font-semibold sm:text-[13px] md:text-[16px]'>
                              {numberFormat(item.product.productPrice * item.quantity)} THB
                            </p>
                          </div>
                          <div className='flex gap-x-[2px]'>
                            <Button size='small' style={{ padding: '2px 1px' }} onClick={() => handleUpdatedata(item.productSizeId, item.quantity - 1)}>
                              <IoRemove width={16} height={16} />
                            </Button>

                            <span className='mx-0 w-3 content-center text-center text-[13px] sm:mx-3 md:text-[16px]'>{item.quantity}</span>

                            <Button
                              size='small'
                              style={{ padding: '2px 1px' }}
                              disabled={item.quantity >= item.product.quantity}
                              onClick={() => handleUpdatedata(item.productSizeId, item.quantity + 1)}
                            >
                              <IoAdd width={16} height={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </ConfigProvider>
  );
};

export default ListItemCart;

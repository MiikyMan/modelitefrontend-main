'use client';

import { IAdressData, IProviceData } from '@/interfaces/address';
import { IExtendedProduct, IProducts } from '@/interfaces/cart';
import { Breadcrumb } from 'antd';
import { FC, useState } from 'react';
import { GoHome } from 'react-icons/go';
import PaymentComponent from '../PaymentComponent';
import CartComponents from './CartComponents';

type IProps = {
  products: IExtendedProduct[];
  address: IAdressData[];
  provinces: IProviceData[];
};

const CartPage: FC<IProps> = (props) => {
  const [checkOut, setCheckOut] = useState<boolean>(false);
  const [CartItems, setCartItems] = useState<IExtendedProduct[]>(props.products);
  const [selectedItems, setSelectedItems] = useState<IProducts[]>([]);
  const [switchPage, setSwitchPage] = useState<boolean>(true);

  const handleCheckOut = () => {
    setCheckOut(true);
    const data = CartItems.filter((item) => item.selected).map((data) => {
      return {
        createdAt: data.createdAt,
        id: data.id,
        product: data.product,
        productSizeId: data.productSizeId,
        quantity: data.quantity,
        updatedAt: data.updatedAt,
        userId: data.userId,
      };
    }) as IProducts[];
    setSelectedItems(data);
    if (data.length === 0) {
      setCheckOut(false);
    } else {
      setSwitchPage(false);
    }
  };

  const handleBackToCart = () => {
    setCheckOut(false);
    setSwitchPage(true);
  };

  return (
    <div className='container mx-auto flex w-full flex-col gap-y-8 px-8 py-8 md:py-12 lg:py-16'>
      {switchPage ? (
        <>
          <div className='hidden justify-center md:block'>
            <Breadcrumb
              className=''
              separator='>'
              items={[
                {
                  title: <GoHome style={{ height: '24px', width: '24px' }} />,
                  href: '/',
                },
                {
                  title: <p className='text-purple1'>Shopping Cart</p>,
                },
              ]}
            />
          </div>
          <div className='text-center'>
            <span className='text-[23px] font-semibold md:text-3xl'>Shopping Cart</span>
          </div>
          <div>
            <div className='grid grid-cols-1 justify-center gap-6 md:grid-cols-3 md:gap-0 md:space-x-6 lg:space-x-12'>
              <CartComponents data={CartItems} disable={checkOut} checkOut={handleCheckOut} setCartItems={setCartItems} />
            </div>
          </div>
        </>
      ) : (
        <PaymentComponent products={selectedItems} address={props.address} provinces={props.provinces} onBack={handleBackToCart} />
      )}
    </div>
  );
};

export default CartPage;

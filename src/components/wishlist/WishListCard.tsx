'use client';
import { ExtendedWishList } from '@/interfaces/wishlist';
import { getWishList, removeWishList } from '@/api/wishlist';
import { extendWishListWithSumQuantity, numberFormat } from '@/utils/format';
import { Button, List } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
interface Props {
  data: ExtendedWishList[] | null;
}

const Wishlistcard: React.FC<Props> = ({ data }) => {
  const [MyWishList, setMyWishList] = useState<ExtendedWishList[]>([]);
  const items = MyWishList && Array.isArray(MyWishList) ? MyWishList : [];
  const fetchData = async () => {
    try {
      const data = await getWishList();
      if (data) {
        const newdatas = data ?? [];
        setMyWishList(extendWishListWithSumQuantity(newdatas));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const newdata = data ?? [];
    setMyWishList(newdata);
  }, [data]);
  const handleRemoveWishlist = async (productId: string) => {
    try {
      await removeWishList(productId);
      await fetchData();
    } catch (error) {
      console.error('Error removing wishlist item:', error);
    }
  };
  return (
    <div className='flex-1'>
      <List
        header={
          <div className='my-1 flex space-x-[15px]'>
            <p className='text-[16px] font-semibold sm:text-[19px]'>Wishlist</p>
          </div>
        }
        bordered
        dataSource={items}
        renderItem={(item) => (
          <List.Item className='my-3 border-b border-gray-300'>
            <div className='mb-6 w-full space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-base font-normal'>{item.product.seller_name}</p>
                <Button size='small'>
                  <FaHeart className='text-purple1' onClick={() => handleRemoveWishlist(item.productId)} />
                </Button>
              </div>
              <div className='space-y-4 sm:flex sm:space-y-0'>
                <div className='flex flex-1 space-x-4'>
                  <Image width={150} height={128} className='h-32 rounded-[15px] object-cover' src={item.product.imageUrl} alt={item.product.name} />
                  <div className='space-y-1'>
                    <p className='text-[13px] font-semibold sm:text-base'>{item.product.name}</p>
                    <div className='space-x-3'>
                      <span className='text-[13px] font-normal sm:text-base'>Price</span>
                      <span className='text-[13px] font-normal sm:text-base'>{numberFormat(item.product.price)} THB</span>
                    </div>
                    <div className='space-x-3'>
                      <span className='text-[13px] font-normal sm:text-base'>Qty</span>
                      <span className='text-[13px] font-normal sm:text-base'>{item.sumquantity}</span>
                    </div>
                  </div>
                </div>
                <div className='sm:place-self-center'>
                  <Link href={`/product/${item.productId}`}>
                    <Button type='primary' size='large' disabled={item.sumquantity === 0}>
                      Add to cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
export default Wishlistcard;

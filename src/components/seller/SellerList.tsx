'use client';

import { ISeller } from '@/interfaces/seller';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { GoPlus } from 'react-icons/go';

interface IProps {
  seller_list: ISeller[];
}

interface ISellerCard {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
}

const SellerList: FC<IProps> = (props) => {
  return (
    <div className='flex w-full flex-col content-center gap-8'>
      <div className='flex w-full flex-col content-center gap-4'>
        <div className='w-fit self-center text-xl font-bold'>Select Your Profile</div>
        <div className='w-fit self-center'>Select the accouct where your want to setting your store </div>
      </div>
      <div className='container flex flex-wrap justify-center gap-4'>
        {props.seller_list.map((seller) => {
          return (
            <Link
              href={`seller/${seller.id}`}
              key={seller.id}
              className='h-45 w-full rounded-xl bg-white hover:border hover:border-purple1 sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]'
            >
              <SellerCard id={seller.id} name={seller.name} description={seller.description} logoUrl={seller.logoUrl} />
            </Link>
          );
        })}
        <Link
          href='seller/new'
          className='flex h-45 w-full flex-col place-items-center justify-center gap-3 rounded-xl bg-white hover:border hover:border-purple1 sm:w-[calc(50%-8px)] lg:w-[calc(33.33%-11px)]'
        >
          <div className='h-fit w-fit rounded-full border border-purple1'>
            <GoPlus size={35} color='#6e62e5' />
          </div>
          <span className='text-purple1'>create new shop</span>
        </Link>
      </div>
    </div>
  );
};

const SellerCard: FC<ISellerCard> = (props) => {
  return (
    <div className='flex h-full w-full flex-col place-items-center justify-center gap-3'>
      <Image src={props.logoUrl} alt={props.description} className='rounded-full' width={60} height={60} />
      <span className='w-fit text-xl font-bold'>{props.name}</span>
    </div>
  );
};

export default SellerList;

import SellerBreadcrumb from '@/components/seller/SellerBreadcrumb';
import SellerSideMenu from '@/components/seller/SellerMenu';
import { ISeller } from '@/interfaces/seller';
import { isAuth } from '@/api/auth';
import { isSeller } from '@/api/seller';
import { redirect } from 'next/navigation';
import React from 'react';

const HomeLayout = (props: { children: React.ReactNode }) => {
  return <div className='grid gap-x-2 gap-y-8 p-6 lg:p-8 xl:p-16'>{props.children}</div>;
};

export default async function SettingLayout({ children, params }: Readonly<{ children: React.ReactNode; params: { seller_id: string } }>) {
  const [seller, auth] = await Promise.all([isSeller(params.seller_id), isAuth()]);

  if (!auth) {
    redirect('/login');
  } else if (!seller) {
    redirect('404');
  }

  return (
    <HomeLayout>
      <SellerBreadcrumb />
      <div className='flex gap-4'>
        <SellerSideMenu Seller={seller as ISeller} />
        {children}
      </div>
    </HomeLayout>
  );
}

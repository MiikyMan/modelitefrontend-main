'use client';
import { usePathname } from 'next/navigation';
import { Breadcrumb } from 'antd';
import { AiOutlineHome } from 'react-icons/ai';

const SettingBreadcrumb: React.FC = () => {
  const pathname = usePathname();

  const path_list = [
    {
      title: <span className='text-xl'>Profile</span>,
      href: '/setting',
    },
    {
      title: <span className='text-xl'>Address</span>,
      href: '/setting/address',
    },
    {
      title: <span className='text-xl'>Order History</span>,
      href: '/setting/order-history',
    },
    {
      title: <span className='text-xl'>Wishlist</span>,
      href: '/setting/wishlist',
    },
  ];

  const items = [
    {
      title: <AiOutlineHome className='size-5 content-center' />,
      href: '/',
    },
    path_list.find((item) => item.href === pathname) ?? {
      title: 'Profile',
      href: '/setting',
    },
  ];

  return <Breadcrumb separator='>' items={items} className='hidden lg:block' />;
};

export default SettingBreadcrumb;

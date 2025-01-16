'use client';
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';

const SellerBreadcrumb: React.FC = () => {
  const pathname = usePathname();

  const path_list = [
    {
      title: <span className='text-xl'>Dashboard</span>,
      href: '',
    },
    {
      title: <span className='text-xl'>My Product</span>,
      href: 'my-product',
    },
    {
      title: <span className='text-xl'>Order History</span>,
      href: 'order-history',
    },
    {
      title: <span className='text-xl'>Account & Finance</span>,
      href: 'account',
    },
  ];

  const items = [
    {
      title: <AiOutlineHome className='size-5 content-center' />,
      href: '/',
    },
  ];

  if (pathname !== '') {
    path_list.slice(1).forEach((item) => {
      if (pathname.includes(item.href)) {
        items.push(item);
      }
    });
  } else {
    items.push(path_list[0]);
  }

  return <Breadcrumb separator='>' items={items} className='hidden lg:block' />;
};

export default SellerBreadcrumb;

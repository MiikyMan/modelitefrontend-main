'use client';
import { ISeller } from '@/interfaces/seller';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline, IoPieChartOutline } from 'react-icons/io5';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { AiOutlineCodeSandbox, AiOutlineSync } from 'react-icons/ai';
import { TfiWallet } from 'react-icons/tfi';

interface MenuItemProps {
  Seller: ISeller;
}

const SellerSideMenu = (props: MenuItemProps) => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', icon: IoHomeOutline, route: `/` },
    { name: 'Dashboard', icon: IoPieChartOutline, route: `/seller/${props.Seller.id}` },
    { name: 'My Product', icon: AiOutlineCodeSandbox, route: `/seller/${props.Seller.id}/my-product` },
    { name: 'Order History', icon: AiOutlineSync, route: `/seller/${props.Seller.id}/order-history` },
    { name: 'Account & Finance', icon: TfiWallet, route: `/seller/${props.Seller.id}/account` },
    { name: 'Log-out', icon: HiArrowRightOnRectangle, route: `/logout` },
  ];

  return (
    <div className='hidden h-fit rounded-xl border border-gray-200 bg-white lg:block xl:w-92'>
      <div className='grid grid-cols-[2fr_6fr] gap-x-2 px-2 py-4'>
        <div className='flex content-center justify-center'>
          <Image src={props.Seller.logoUrl} alt='seller-logo' width={48} height={48} className='rounded-full' />
        </div>
        <div>
          <h2 className='text-lg font-semibold'>{props.Seller.name}</h2>
          <p className='text-gray-500'>Seller</p>
        </div>
      </div>
      <div>
        {menuItems.map((item) => (
          <Link
            href={item.route}
            key={item.name}
            className={`flex h-16 cursor-pointer items-center border-l-4 py-2 pl-4 text-lg hover:border-purple1 hover:bg-purple4 ${pathname === item.route ? 'border-l-4 border-purple1 bg-purple4' : 'border-transparent text-gray-500'}`}
          >
            <item.icon className='mr-3 h-5 w-5' />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SellerSideMenu;

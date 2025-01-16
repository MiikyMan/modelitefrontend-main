'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { Fragment, useState } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { IoBagOutline, IoClose, IoHeartOutline, IoMapOutline, IoReorderThreeOutline, IoSyncOutline } from 'react-icons/io5';
import { PiShoppingCart } from 'react-icons/pi';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const navList = [
    {
      label: 'Favorites',
      route: '/setting/wishlist',
      icon: IoHeartOutline,
    },
    {
      label: 'Account',
      route: '/setting',
      icon: BsPerson,
      submenu: [
        {
          label: 'Profile',
          route: '/setting',
          icon: FaUserEdit,
        },
        {
          label: 'Address',
          route: '/setting/address',
          icon: IoMapOutline,
        },
        {
          label: 'Order History',
          route: '/setting/order-history',
          icon: IoSyncOutline,
        },
      ],
    },
    {
      label: 'Cart',
      route: '/cart',
      icon: PiShoppingCart,
    },
    {
      label: 'Seller',
      route: '/seller',
      icon: IoBagOutline,
    },
  ];
  const [showMenu, setShowMenu] = useState(false);
  const toggleNavbar = () => {
    setShowMenu(!showMenu);
  };

  if (pathname === '/login') return null;

  return (
    <nav aria-label='Main Navigation' className='sticky top-0 z-50 border-gray-200 bg-white shadow-md'>
      <div className='min-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-2 sm:px-12'>
        <Link href='/' className='pl-4 text-2xl font-bold'>
          <div className='flex flex-row items-center'>
            <Image src='/logo.png' width={40} height={40} alt='logo' className='aspect-square' />
          </div>
        </Link>
        {/* Navbar Buttons */}
        <button
          aria-label='toggle navbar'
          type='button'
          onClick={toggleNavbar}
          className='focus:ring-lightblue inline-flex size-10 items-center justify-center rounded-lg bg-gray-100 p-2 text-sm focus:outline-none focus:ring-2 lg:hidden'
        >
          {showMenu ? <IoClose className='size-5' /> : <IoReorderThreeOutline className='size-5' />}
        </button>

        {/* NavList */}
        <div className={showMenu ? 'w-full lg:block lg:w-auto' : 'hidden w-full lg:block lg:w-auto'}>
          <div className='mx-auto mt-4 flex w-fit flex-col items-start rounded-lg p-4 font-bold md:p-0 lg:mt-0 lg:flex-row lg:border-0 xl:space-x-4 rtl:space-x-reverse'>
            {navList.map((item, index) => (
              <Fragment key={index}>
                <Link href={item.route} className='flex content-center justify-center gap-2 rounded-md px-3 py-2 hover:text-foreground' key={index}>
                  <item.icon className='size-5' /> <span className='lg:hidden'>{item.label}</span>
                </Link>
                {item.submenu &&
                  item.submenu.map((subItem, subIndex) => (
                    <Link
                      href={subItem.route}
                      className='ml-8 flex content-center justify-center gap-2 rounded-md px-3 py-2 hover:text-foreground lg:hidden'
                      key={`sub_${index}_${subItem.label}_${subIndex}`}
                    >
                      <subItem.icon className='size-5' />
                      <span>{subItem.label}</span>
                    </Link>
                  ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

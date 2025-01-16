import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='pt-12'>
      <div className='grid grid-cols-1 gap-x-0 gap-y-4 pb-4 xl:grid-cols-3 xl:gap-x-4 xl:gap-y-0'>
        <div className='flex flex-col gap-y-4 xl:max-w-128 xl:justify-between xl:gap-y-0'>
          <h1 className='text-4xl font-bold'>ModÉlite</h1>
          <p className='text-gray1'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
          <div className='flex flex-row gap-x-4'>
            <Link href='#' className='size-8 rounded-full border border-gray1 bg-black p-1'>
              <Image src='/fb.png' alt='facebook' width={40} height={40} className='aspect-square object-fill' />
            </Link>
            <Link href='#' className='size-8 rounded-full border border-gray1 bg-white p-1'>
              <Image src='/ig.webp' alt='twitter' width={40} height={40} className='aspect-square object-contain' />
            </Link>
            <Link href='#' className='size-8 rounded-full border border-gray1 bg-white p-1'>
              <Image src='/github.webp' alt='github' width={40} height={40} className='aspect-square object-contain' />
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-4 xl:col-span-2'>
          <div className='grid grid-cols-1 gap-y-4'>
            <h2>Company</h2>
            <Link href='#' className='text-gray1'>
              About
            </Link>
            <Link href='#' className='text-gray1'>
              Features
            </Link>
            <Link href='#' className='text-gray1'>
              Works
            </Link>
            <Link href='#' className='text-gray1'>
              Career
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-y-4'>
            <h2>Help</h2>
            <Link href='#' className='text-gray1'>
              Customer Support
            </Link>
            <Link href='#' className='text-gray1'>
              Delivery Details
            </Link>
            <Link href='#' className='text-gray1'>
              Terms & Conditions
            </Link>
            <Link href='#' className='text-gray1'>
              Privacy Policy
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-y-4'>
            <h2>FAQ</h2>
            <Link href='#' className='text-gray1'>
              Account
            </Link>
            <Link href='#' className='text-gray1'>
              Manage Deliveries
            </Link>
            <Link href='#' className='text-gray1'>
              Orders
            </Link>
            <Link href='#' className='text-gray1'>
              Payments
            </Link>
          </div>
          <div className='grid grid-cols-1 gap-y-4'>
            <h2>Resources</h2>
            <Link href='#' className='text-gray1'>
              Free eBooks
            </Link>
            <Link href='#' className='text-gray1'>
              Development Tutorial
            </Link>
            <Link href='#' className='text-gray1'>
              How to - Blog
            </Link>
            <Link href='#' className='text-gray1'>
              Youtube Playlist
            </Link>
          </div>
        </div>
      </div>
      <hr className='w-full border border-black2 opacity-15' />
      <div className='my-2 flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0'>
        <h4 className='content-center text-black2'>Modelite.sssboom.xyz © 2024, All Rights Reserved</h4>
        <div className='flex flex-row flex-wrap space-x-4'>
          <Image src='/visa.jpg' alt='visa' width={40} height={25} className='aspect-square object-contain' />
          <Image src='/master_card.jpg' alt='master_card' width={40} height={25} className='aspect-square object-contain' />
          <Image src='/paypal.jpg' alt='paypal' width={40} height={25} className='aspect-square object-contain' />
          <Image src='/apple_pay.jpg' alt='apple_pay' width={40} height={25} className='aspect-square object-contain' />
          <Image src='/google_pay.jpg' alt='google_pay' width={40} height={25} className='aspect-square object-contain' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

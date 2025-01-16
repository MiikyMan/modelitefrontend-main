'use client';
import { IDashBoard, ISeller } from '@/interfaces/seller';
import 'chart.js/auto';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';

interface IProps {
  seller: ISeller;
  dashboard: IDashBoard;
}

const DashBoardComponent: FC<IProps> = (props) => {
  const materialColors = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B',
  ];

  const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), {
    ssr: false,
  });

  return (
    <div className='h-fit w-full'>
      <div className='pb-5 font-bold'>Dashboard</div>
      <div className='grid w-full grid-cols-2 gap-3 pb-5 lg:grid-cols-4 xl:gap-10'>
        <div className='flex flex-row justify-center gap-3 rounded-xl bg-purple4 px-2 py-3 lg:px-6 lg:py-8 xl:gap-6'>
          <FaCircleUser size={40} color='#6E62E5' />
          <div className='flex flex-col'>
            <span>Total users</span>
            <span>{props.dashboard.totalOrderUser}</span>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-3 rounded-xl bg-[#D6ECF8] px-2 py-3 lg:px-6 lg:py-8 xl:gap-6'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue1'>
            <FaMoneyBillWave size={25} color='#FFFFFF' />
          </div>
          <div className='flex flex-col'>
            <span>Total Sales</span>
            <span>{props.dashboard.totalOrder}</span>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-3 rounded-xl bg-[#F9DBF4] px-2 py-3 lg:px-6 lg:py-8 xl:gap-6'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#E45ECF]'>
            <FaCalendarAlt size={25} color='#FFFFFF' />
          </div>
          <div className='flex flex-col'>
            <span>Total Orders</span>
            <span>{props.dashboard.totalOrderAmount}</span>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-3 rounded-xl bg-[#FFDED4] px-2 py-3 lg:px-6 lg:py-8 xl:gap-6'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-orange1'>
            <FaMoneyBillWave size={25} color='#FFFFFF' />
          </div>
          <div className='flex flex-col'>
            <span>Product Sales</span>
            <span>{props.dashboard.totalOrderProductUnit}</span>
          </div>
        </div>
      </div>
      <div className='w-full gap-y-6 rounded-2xl border'>
        <div className='border-b px-6 py-4 text-xl font-bold'>Sales Summary</div>
        <div className='grid grid-cols-2 sm:grid-cols-4'>
          <div className='col-span-2 px-6 py-4'>
            <Pie
              data={{
                labels: props.dashboard.productDashboard.map((item) => item.productName),
                datasets: [
                  {
                    label: 'Quantity of product',
                    data: props.dashboard.productDashboard.map((item) => item.quantity),
                    backgroundColor: materialColors,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  title: {
                    display: true,
                    text: 'Product Quantity',
                  },
                },
              }}
            />
          </div>
          <div className='col-span-2 px-6 py-4'>
            <Pie
              data={{
                labels: props.dashboard.orderSizeDashboard.map((item) => item.size),
                datasets: [
                  {
                    label: 'Quantity of product',
                    data: props.dashboard.orderSizeDashboard.map((item) => item.quantity),
                    backgroundColor: materialColors,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                  title: {
                    display: true,
                    text: 'Product Size Quantity',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComponent;

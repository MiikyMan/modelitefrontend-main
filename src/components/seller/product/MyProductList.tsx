'use client';
import { GoPlus } from 'react-icons/go';
import { IProduct } from '@/interfaces/product';
import { Button, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';

const TableColumns: ColumnsType<IProduct> = [
  {
    title: 'Product',
    width: '40%',
    render: (_, record) => {
      return (
        <div className='flex flex-row gap-x-3'>
          <Image src={record.imageUrl} alt={record.name} width={64} height={64} className='aspect-square rounded-xl object-fill' />
          <div className='content-center'>
            <span className='text-xl font-medium'>{record.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    title: 'Stock',
    width: '15%',
    render: (_, record) => {
      const stock = record.productOption.reduce((acc, options) => {
        return (
          acc +
          options.productSize.reduce((acc, size) => {
            return acc + size.quantity;
          }, 0)
        );
      }, 0);
      return <span>{stock}</span>;
    },
  },
  {
    title: 'Price',
    width: '15%',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Action',
    width: '30%',
    key: 'action',
    render: () => (
      <div className='flex flex-row gap-x-3'>
        <Button
          type='primary'
          size='large'
          style={{
            padding: '0px',
            width: '40px',
            height: '40px',
          }}
        >
          <AiOutlineEye className='size-6' />
        </Button>
        <Button
          type='primary'
          size='large'
          style={{
            padding: '0px',
            width: '40px',
            height: '40px',
            backgroundColor: '#6FBBE8',
          }}
        >
          <AiOutlineEdit className='size-6' />
        </Button>
        <Button
          type='primary'
          size='large'
          style={{
            padding: '0px',
            width: '40px',
            height: '40px',
            backgroundColor: '#E76C6B',
          }}
        >
          <RiDeleteBin6Line className='size-6' />
        </Button>
      </div>
    ),
  },
];

interface IMyProductListProps {
  sellerId: string;
  product: IProduct[];
}

const MyProductList: FC<IMyProductListProps> = (props) => {
  const [filterProductValue, setFilterProductValue] = useState<{ value: string; label: React.ReactNode }>({ value: '0', label: 'Status product' });
  const handleFilterProduct = (value: { value: string; label: React.ReactNode }) => {
    setFilterProductValue(value);
  };

  return (
    <>
      <div className='flex justify-between p-6'>
        <span className='text-xl font-bold'>My product</span>
        <div className='flex flex-row gap-x-3'>
          <Select
            size='large'
            labelInValue
            placeholder='Status product'
            value={filterProductValue}
            onChange={handleFilterProduct}
            style={{
              width: '180px',
            }}
            options={[
              {
                value: 1,
                label: 'Sale',
              },
              {
                value: 2,
                label: 'Out Stock',
              },
            ]}
          />
          <Link href={`/seller/${props.sellerId}/my-product/new`}>
            <Button
              size='large'
              type='primary'
              style={{
                gap: '12px',
                padding: '12px 16px',
              }}
            >
              <GoPlus className='text-2xl font-extrabold' />
              <h3>Add Product</h3>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table columns={TableColumns} dataSource={props.product} />
      </div>
    </>
  );
};

export default MyProductList;

'use client';
import { IAdressData } from '@/interfaces/address';
import { Button } from 'antd';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FC } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';

interface AddressCardobjects {
  objects: IAdressData;
  onDelete: (id: string) => void;
  push: (href: string, options?: NavigateOptions) => void;
}

const SettingAddressCard: FC<AddressCardobjects> = (props) => {
  const objects = props.objects;

  const address = [objects.address, objects.subDistrict, objects.district, objects.province, objects.zipCode].join(', ');

  return (
    <>
      <div className='grid h-fit w-full grid-cols-1 gap-y-4 rounded-2xl border p-6 lg:grid-cols-3 xl:grid-cols-4'>
        <div className='col-span-1 flex flex-col place-content-center gap-y-2'>
          <span className='flex flex-row gap-x-3 py-3 lg:hidden'>
            {objects.default ? <div className='w-fit content-center rounded-2xl bg-purple3 px-4 py-1 text-purple1'>Default</div> : <></>}
            <div className='w-fit content-center rounded-2xl bg-blue3 px-4 py-1 text-blue1'>{objects.label}</div>
          </span>
          <span>{objects.firstName + ' ' + objects.lastName}</span>
          <span>{'(+62)' + ' ' + objects.phone}</span>
          <span className='hidden flex-row gap-x-3 lg:flex'>
            {objects.default ? <div className='w-fit content-center rounded-2xl bg-purple3 px-4 py-1 text-purple1'>Default</div> : <></>}
            <div className='w-fit content-center rounded-2xl bg-blue3 px-4 py-1 text-blue1'>{objects.label}</div>
          </span>
        </div>
        <div className='col-span-1 flex lg:place-content-center lg:justify-center xl:col-span-2'>
          <div className='w-full text-pretty'>{address}</div>
        </div>
        <div className='col-span-1 flex flex-row lg:place-content-end lg:justify-end'>
          <Button size='small' ghost style={{ color: '#AAAAAA' }} className='self-center' onClick={() => props.onDelete(objects.id)}>
            <MdDeleteOutline />
            Delete
          </Button>
          <Button size='small' ghost style={{ color: '#6E62E5' }} className='self-center' onClick={() => props.push(`/setting/address/edit/${objects.id}`)}>
            <CiEdit />
            Edit
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingAddressCard;

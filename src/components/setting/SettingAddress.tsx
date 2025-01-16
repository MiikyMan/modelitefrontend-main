'use client';
import SettingAddressCard from '@/components/setting/SettingAddressCard';
import { IAdressData } from '@/interfaces/address';
import { deleteAddress } from '@/api/address';
import { Button } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

interface IProps {
  objects: IAdressData[];
}

const SettingAddress: FC<IProps> = (props) => {
  const router = useRouter();
  const path = usePathname();
  const { objects } = props;
  const onDelete = async (id: string) => {
    deleteAddress(id);
    router.refresh();
  };

  useEffect(() => {
    router.refresh();
  }, [path]);

  return (
    <>
      <div className='w-full gap-y-6 rounded-2xl border p-6'>
        <div className='flex justify-between border-b pb-6'>
          <span className='font-bold'>Address</span>
          <Button size='small' ghost style={{ color: '#6E62E5' }} onClick={() => router.push('/setting/address/new')}>
            Add address
          </Button>
        </div>
        <div className='flex flex-col gap-y-6 pt-6'>
          {objects.map((item) => {
            return <SettingAddressCard key={item.id} objects={item} onDelete={onDelete} push={router.push} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SettingAddress;

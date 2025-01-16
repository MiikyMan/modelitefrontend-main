'use server';

import SettingAddressEdit from '@/components/setting/SettingAddressEdit';
import { ISelectOption } from '@/interfaces/input';
import { getProvinces } from '@/api/address';
import { redirect } from 'next/navigation';

export default async function NewAddress() {
  const provinces = await getProvinces();
  if (provinces === null) {
    redirect('/500');
  }
  const provincesOption: ISelectOption[] = provinces
    .map((item) => ({ label: item.nameTh, value: item.id }))
    .sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });

  return (
    <>
      <SettingAddressEdit object={undefined} provinces={provinces} provincesOption={provincesOption} />
    </>
  );
}

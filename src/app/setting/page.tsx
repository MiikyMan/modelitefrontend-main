import SettingProfileCard from '@/components/setting/SettingProfileCard';
import React from 'react';
import { getProfile } from '@/api/profile';
import { redirect } from 'next/navigation';

export default async function ProfileSetting() {
  const data = await getProfile();

  if (data == null) {
    redirect('/logout');
  }
  return (
    <>
      <SettingProfileCard userInfo={data} />
    </>
  );
}

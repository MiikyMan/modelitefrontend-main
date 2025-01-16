import { Logout } from '@/api/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const LogoutPage: React.FC = async () => {
  const logout_success = await Logout();
  if (logout_success) redirect('/');
  redirect('/login');
  return <></>;
};

export default LogoutPage;

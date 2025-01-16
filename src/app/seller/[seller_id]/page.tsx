'use server';

import DashBoardComponent from '@/components/seller/dashboard/DashBoardComponent';
import { getDashBoard, isSeller } from '@/api/seller';
import { redirect } from 'next/navigation';

export default async function Dashboard({ params }: { params: { seller_id: string } }) {
  const seller = await isSeller(params.seller_id);
  if (typeof seller === 'boolean') {
    redirect('/404');
  }

  const dashboard = await getDashBoard(params.seller_id);
  if (dashboard === null) {
    redirect('/404');
  }

  return (
    <>
      <DashBoardComponent seller={seller} dashboard={dashboard} />
    </>
  );
}

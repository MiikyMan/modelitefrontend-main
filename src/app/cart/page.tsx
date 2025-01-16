'use server';
import CartPage from '@/components/cart/CartPage';
import { IExtendedProduct } from '@/interfaces/cart';
import { getAddress, getProvinces } from '@/api/address';
import { getCartSelf } from '@/api/cart';
import { redirect } from 'next/navigation';

export default async function Cart() {
  const address = await getAddress();

  if (address === null) {
    return;
  }

  const provinces = await getProvinces();
  if (provinces === null) {
    return;
  }

  let newdata: IExtendedProduct[] = [];

  try {
    const data = await getCartSelf();
    if (data == null) {
      return redirect('/500');
    } else {
      newdata = data.map((arr) => ({ ...arr, selected: false }));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return <CartPage products={newdata} address={address} provinces={provinces} />;
}

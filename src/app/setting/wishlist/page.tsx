'use server';

import Wishlistcard from '@/components/wishlist/WishListCard';
import { extendWishListWithSumQuantity } from '@/utils/format';
import { getWishList } from '@/api/wishlist';
import { ExtendedWishList } from '@/interfaces/wishlist';
export default async function wishlist() {
  try {
    const data = await getWishList();
    if (data == null) {
    } else {
      const newdata: ExtendedWishList[] = data ? extendWishListWithSumQuantity(data) : [];
      return (
        <>
          <Wishlistcard data={newdata} />
        </>
      );
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <>
        <h1>Error loading wishlist</h1>
      </>
    );
  }
}

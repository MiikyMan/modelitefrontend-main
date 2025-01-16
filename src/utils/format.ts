import { ExtendedWishList, WishList } from '@/interfaces/wishlist';
import { IExtendedProduct } from '@/interfaces/cart';

export function numberFormat(number: number): string {
  return Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
}

export function phoneNumberFormat(phoneNumber: string) {
  const listOfNumber = phoneNumber.split('');
  return listOfNumber.slice(0, 3).join('') + '-' + listOfNumber.slice(3, 6).join('') + '-' + listOfNumber.slice(6).join('');
}

export function dateFormat(date: Date | string) {
  return new Date(date)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(/(\d{2}) (\w{3}) (\d{4})/, '$1 $2, $3'); // Ensure consistent formatting
}

export function extendWishListWithSumQuantity(wishList: WishList[]): ExtendedWishList[] {
  return wishList.map((item) => {
    const sumquantity = item.product.productOption.reduce((totalSum, option) => {
      const optionQuantitySum = option.productSize.reduce((sum, size) => sum + size.quantity, 0);
      return totalSum + optionQuantitySum;
    }, 0);

    return { ...item, sumquantity };
  });
}
export function calculateTotal(delivery: number, my_item: IExtendedProduct[]) {
  const total = delivery + my_item.filter((item) => item.selected).reduce((total, item) => total + item.quantity * item.product.productPrice, 0);
  return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

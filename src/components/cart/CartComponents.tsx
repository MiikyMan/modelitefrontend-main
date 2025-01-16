'use client';

import ListItemCart from '@/components/cart/ListItemCart';
import Summary from '@/components/cart/Summary';
import { IExtendedProduct } from '@/interfaces/cart';
interface MyComponentProps {
  data: IExtendedProduct[];
  disable: boolean;
  checkOut: () => void;
  setCartItems: React.Dispatch<React.SetStateAction<IExtendedProduct[]>>;
}
const CartComponents: React.FC<MyComponentProps> = (props) => {
  return (
    <>
      <div className='col-span-1 md:col-span-2'>
        <ListItemCart cartItems={props.data} setCartItems={props.setCartItems} />
      </div>
      <Summary my_item={props.data} disable={props.disable} checkOut={props.checkOut} />
    </>
  );
};
export default CartComponents;

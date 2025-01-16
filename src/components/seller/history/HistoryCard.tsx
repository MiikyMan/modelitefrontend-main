import { ISellerOrder } from '@/interfaces/seller';
import { Button, Image } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';
import { CiCircleCheck, CiCircleRemove, CiDeliveryTruck, CiRepeat } from 'react-icons/ci';

interface IProps {
  status: string;
  orders: ISellerOrder;
  viewDeliveryDetail: () => void;
}

interface IPropsOrder {
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productOptionLabel: string;
  productSize: string;
  productPrice: number;
  quantity: number;
}

const HistoryCard: FC<IProps> = (props) => {
  const router = useRouter();
  const param = useParams();

  return (
    <div className='flex w-full flex-col gap-5 border-b p-5'>
      <div className='grid w-full grid-cols-2 place-content-center gap-2 rounded-2xl bg-[#F5F6FB] p-6 lg:grid-cols-5'>
        <div className='hidden flex-col gap-2 lg:flex'>
          <span className='font-bold'>User</span>
          <span>{[props.orders.firstName, props.orders.lastName].join(' ')}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-bold'>Order ID</span>
          <span>{props.orders.id}</span>
        </div>
        <div className='hidden flex-col gap-2 lg:flex'>
          <span className='font-bold'>Date</span>
          <span>
            {new Date(props.orders.createdAt).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            })}
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='text-end font-bold lg:text-start'>Total</span>
          <span className='text-end lg:text-start'>
            {[props.orders.totalPrice, `(${props.orders.orderProductData.reduce((n, { quantity }) => n + quantity, 0)} item)`].join(' ')}
          </span>
        </div>
        <div className='flex content-center items-center justify-start lg:justify-end'>
          <Button type='primary' size='large' onClick={() => router.push(`/seller/${param.seller_id}/order-history/${props.orders.id}`)}>
            View detail
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {props.orders.orderProductData.map((item) => {
          return (
            <ProductData
              key={item.id}
              productName={item.productName}
              productDescription={item.productDescription}
              productImageUrl={item.productImageUrl}
              productOptionLabel={item.productOptionLabel}
              productSize={item.productSize}
              productPrice={item.productPrice}
              quantity={item.quantity}
            />
          );
        })}
      </div>
      <div className='flex flex-col justify-between sm:flex-row'>
        <div className='flex flex-row content-center items-center gap-2'>
          {props.status === 'PAYMENT_SUCCESS' || props.status === 'DELIVERY_ON_THE_WAY' ? (
            <>
              <CiDeliveryTruck color='#60a5fa' size={24} />
              <span className='text-blue-400'>Must be Shipping</span>
            </>
          ) : (
            <></>
          )}
          {props.status === 'REFUND' ? (
            <>
              <CiRepeat color='#ef4444' size={24} />
              <span className='text-red-500'>Refunded</span>
            </>
          ) : (
            <></>
          )}
          {props.status === 'END' ? (
            <>
              <CiCircleCheck color='#8e85eb' size={24} />
              <span className='text-purple2'>Shipped Success</span>
            </>
          ) : (
            <></>
          )}
          {props.status === 'CANCEL' ? (
            <>
              <CiCircleRemove color='#ef4444' size={24} />
              <span className='text-red-500'>Cancel</span>
            </>
          ) : (
            <></>
          )}
        </div>
        {props.status === 'PAYMENT_SUCCESS' ? (
          <Button size='large' onClick={props.viewDeliveryDetail} style={{ backgroundColor: '#46A8E1', color: '#FFFFFF' }}>
            Product delivery
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ProductData: FC<IPropsOrder> = (props) => {
  return (
    <div className='grid grid-cols-3'>
      <div className='col-span-3 flex flex-col gap-4 sm:col-span-2 sm:flex-row'>
        <div className='self-center'>
          <Image src={props.productImageUrl} alt={props.productDescription} width={128} height={128} style={{ borderRadius: '12px', objectFit: 'cover' }} />
        </div>
        <div className='hidden flex-col gap-4 sm:flex'>
          <span>{props.productName}</span>
          <div className='flex flex-col'>
            <span>
              Color: <span className='text-gray-400'>{props.productOptionLabel}</span>
            </span>
            <span>
              Size(US): <span className='text-gray-400'>{props.productSize}</span>
            </span>
          </div>
          <span>Price {props.productPrice} THB</span>
        </div>
      </div>
      <div className='col-span-2 block sm:hidden'>
        <div className='flex flex-col gap-4'>
          <span>{props.productName}</span>
          <div className='flex flex-col'>
            <span>
              Color: <span className='text-gray-400'>{props.productOptionLabel}</span>
            </span>
            <span>
              Size(US): <span className='text-gray-400'>{props.productSize}</span>
            </span>
          </div>
          <span>Price {props.productPrice} THB</span>
        </div>
      </div>
      <div className='col-span-1 place-self-end'>
        <span className='size-fit'>Qty {props.quantity}</span>
      </div>
    </div>
  );
};

export default HistoryCard;

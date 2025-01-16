import BackButton from '@/components/orderHistory/BackButton';
import CancelAndContactButton from '@/components/orderHistory/CancelAndContactButton';
import CopyToClipBoard from '@/components/orderHistory/CopyToClipboard';
import { IOrderProductData } from '@/interfaces/order';
import { getOrderInfoById } from '@/api/order';
import { dateFormat, numberFormat, phoneNumberFormat } from '@/utils/format';
import parse from 'html-react-parser';
import Image from 'next/image';
import { BsBox2, BsBoxSeam, BsCheckLg, BsTruck } from 'react-icons/bs';
import { TbCircleCheck } from 'react-icons/tb';

interface GroupOfOrderProductData {
  sellerId: string;
  sellerName: string;
  orderProductData: IOrderProductData[];
}

export default async function OrderHistory({ params: { orderid = '' } }: { params: { orderid: string } }) {
  const OrderInfo = await getOrderInfoById(orderid);
  if (typeof OrderInfo === 'boolean') {
    return;
  }
  const orderProductDataGroupedBySellerId = OrderInfo.orderProductData.reduce((acc: GroupOfOrderProductData[], product: IOrderProductData) => {
    const existedSeller = acc.find((item) => item.sellerId === product.sellerId);
    if (existedSeller) {
      existedSeller.orderProductData.push(product);
    } else {
      acc.push({
        sellerId: product.sellerId,
        sellerName: product.sellerName,
        orderProductData: [product],
      });
    }
    return acc;
  }, []);

  const orderStatusList = [
    {
      statusId: 0,
      status: 'Order received',
    },
    {
      statusId: 1,
      status: 'Processing',
    },
    {
      statusId: 2,
      status: parse('On&nbsp;the&nbsp;way'),
    },
    {
      statusId: 3,
      status: 'Refunded',
    },
  ];

  const orderStatusEncoded = [
    {
      statusId: 0,
      status: 'REFUND',
    },
    {
      statusId: 1,
      status: 'PAYMENT_SUCCESS',
    },
    {
      statusId: 2,
      status: 'DELIVERY_ON_THE_WAY',
    },
    {
      statusId: 3,
      status: 'END',
    },
  ];

  const orderStatusDisplay = (id: number) => {
    return id === 3 ? 'Order Completed!' : id === 2 ? 'Your Parcel is on the way.' : id === 1 ? 'Must be shipped.' : 'Refunded.';
  };
  const currentOrderStatus = orderStatusEncoded.find((item) => item.status === OrderInfo.status)?.statusId || 0;

  return (
    <div className='max-lg:w-screen max-lg:p-4 lg:w-full'>
      <div className='inset-x-0 w-full rounded-3xl border'>
        <div className='flex justify-between border-b-[1px] max-lg:p-4 lg:p-6'>
          <div className='flex gap-3 max-lg:flex-col lg:flex-row lg:items-center'>
            <div className='text-lg font-bold'>View Detail</div>
            <div>Order id: {OrderInfo.id}</div>
            <div className='max-lg:hidden'>|</div>
            <div className='text-blue1'>{orderStatusDisplay(currentOrderStatus)}</div>
          </div>
          <div>
            <BackButton />
          </div>
        </div>

        <div className='max-lg:p-4 lg:p-6'>
          <div className='flex justify-between gap-4 rounded-3xl bg-[#F5F6FB] max-lg:flex-col max-lg:p-4 lg:items-center lg:p-7'>
            <div className=''>
              <div className='text-base font-bold'>Order id</div>
              <CopyToClipBoard pid={OrderInfo.id} />
            </div>
            <div className=' '>
              <div className='text-base font-bold'>Date</div>
              <div>{dateFormat(OrderInfo.createdAt)}</div>
            </div>
            <div className='flex gap-3'>
              <CancelAndContactButton totalAmout={numberFormat(OrderInfo.totalPrice - OrderInfo.discount)} role='user' />
            </div>
          </div>
        </div>

        <div className='pb-13'>
          <div className='flex w-full justify-center py-10'>
            <div className='relative flex w-full items-center justify-center'>
              <div className='absolute flex items-center justify-center max-lg:w-10/12 lg:w-9/12'>
                <div className='mb-2'>
                  <div className='absolute left-0 z-0 h-2 w-full rounded-full bg-foreground'></div>
                  <div
                    className={`animate absolute left-[1px] z-0 h-2 rounded-full ${!currentOrderStatus ? 'bg-natural8' : 'bg-purple1'} [animation-delay:-0.3s]`}
                    style={{
                      width: currentOrderStatus === 0 ? '99.5%' : `${(currentOrderStatus * 100) / 3 - 0.7}%`,
                    }}
                  ></div>
                </div>
                <div className='z-10 flex w-full justify-between'>
                  {currentOrderStatus !== 0 ? (
                    <>
                      <div
                        className={`relative flex size-11 items-center justify-center rounded-full border-[1.5px] ${currentOrderStatus >= 0 ? 'border-transparent bg-purple1 text-white' : 'border-dashed border-purple1 bg-white'} `}
                      >
                        <BsCheckLg className={`size-5 ${currentOrderStatus >= 0 ? 'text-white' : 'text-purple1'}`} />
                        <div className={`absolute top-11 text-center max-lg:text-xs lg:text-base ${currentOrderStatus >= 0 ? 'text-purple1' : 'text-black'}`}>
                          Order <br />
                          received
                        </div>
                      </div>

                      <div
                        className={`relative flex size-11 items-center justify-center rounded-full border-[1.5px] ${currentOrderStatus >= 1 ? 'border-transparent bg-purple1 text-white' : 'border-dashed border-purple1 bg-white'} `}
                      >
                        <BsBoxSeam className={`size-5 ${currentOrderStatus >= 1 ? 'text-white' : 'text-purple1'}`} />
                        <div className={`absolute top-11 text-center max-lg:text-xs lg:text-base ${currentOrderStatus >= 1 ? 'text-purple1' : 'text-black'}`}>
                          Processing
                        </div>
                      </div>

                      <div
                        className={`relative flex size-11 items-center justify-center rounded-full border-[1.5px] ${currentOrderStatus >= 2 ? 'border-transparent bg-purple1 text-white' : 'border-dashed border-purple1 bg-white'} `}
                      >
                        {/* <TruckOutlined className='text-purple1' /> */}
                        <BsTruck className={`size-5 ${currentOrderStatus >= 2 ? 'text-white' : 'text-purple1'}`} />
                        <div className={`absolute top-11 text-center max-lg:text-xs lg:text-base ${currentOrderStatus >= 2 ? 'text-purple1' : 'text-black'}`}>
                          On&nbsp;the&nbsp;way
                        </div>
                      </div>

                      <div
                        className={`relative flex size-11 items-center justify-center rounded-full border-[1.5px] ${currentOrderStatus >= 3 ? 'border-transparent bg-purple1 text-white' : 'border-dashed border-purple1 bg-white'} `}
                      >
                        <div className='relative'>
                          <BsBox2 className={`size-4 ${currentOrderStatus >= 3 ? 'text-white' : 'text-purple1'}`} />
                          <div className='absolute -bottom-[2px] -right-[2px] flex items-center justify-center rounded-full'>
                            <div className='relative flex h-[12px] w-[12px] items-center justify-center rounded-full'>
                              <div
                                className={`absolute z-10 size-[8px] rounded-l-full rounded-t-full ${currentOrderStatus >= 3 ? 'bg-purple1' : 'bg-white'}`}
                              ></div>
                              <TbCircleCheck className={`absolute z-10 size-[11px] ${currentOrderStatus >= 3 ? 'text-white' : 'text-purple1'}`} />
                            </div>
                          </div>
                        </div>
                        <div className={`absolute top-11 text-center max-lg:text-xs lg:text-base ${currentOrderStatus >= 3 ? 'text-purple1' : 'text-black'}`}>
                          Delivered
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {orderStatusList.map((item: { statusId: number; status: string | JSX.Element | JSX.Element[] }, index: number) => (
                        <div key={index} className='relative flex size-7 items-center justify-center rounded-full bg-natural8'>
                          <div className='absolute top-8 text-center text-natural8 max-lg:text-xs lg:text-base'>{item.status}</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col rounded-3xl border max-lg:mx-4 max-lg:mb-4 max-lg:p-4 lg:mx-6 lg:mb-7 lg:p-7'>
          <div className='w-full text-lg font-bold'>Delivery to</div>
          <hr className='my-4' />
          <div className='flex w-full flex-grow items-start justify-between gap-4 max-lg:flex-col'>
            <div className='w-full'>
              <div className='text-base'>
                {OrderInfo.firstName} {OrderInfo.lastName}
              </div>
              <div className='text-base text-gray1'>{OrderInfo.address}</div>
            </div>
            <div className='w-full'>
              <div className='text-base'>Email</div>
              <div className='text-base text-gray1'>{OrderInfo.email}</div>
            </div>
            <div className='w-full'>
              <div className='text-base'>Phone Number</div>
              <div className='text-base text-gray1'>{phoneNumberFormat(OrderInfo.phone)}</div>
            </div>
          </div>
        </div>

        <div className='flex flex-col rounded-3xl border max-lg:mx-4 max-lg:mb-4 max-lg:p-4 lg:mx-6 lg:mb-7 lg:p-7'>
          <div className='flex w-full justify-between text-base'>
            <div className='text-gray1'>Subtotal</div>
            <div className='text-gray1'>{numberFormat(OrderInfo.productPrice)}</div>
          </div>
          <div className='flex w-full justify-between text-base'>
            <div className='text-gray1'>Delivery</div>
            <div className='text-gray1'>{numberFormat(OrderInfo.shippingPrice)}</div>
          </div>
          <div className='flex w-full justify-between text-base'>
            <div className='text-gray1'>Discount</div>
            <div className='text-gray1'>-{numberFormat(OrderInfo.discount)}</div>
          </div>
          <hr className='my-4' />
          <div className='flex w-full justify-between text-lg font-bold text-purple1'>
            <div>Total</div>
            <div>{numberFormat(OrderInfo.totalPrice - OrderInfo.discount)}</div>
          </div>
        </div>

        <div className='flex w-full flex-col px-6 max-lg:mb-4 lg:mb-7'>
          {orderProductDataGroupedBySellerId.map((item: GroupOfOrderProductData) => {
            return (
              <>
                <div className='max-lg:mb-3 max-lg:text-lg lg:mb-5 lg:text-xl'>{item.sellerName}</div>
                {item.orderProductData.map((item: IOrderProductData, index: number) => (
                  <div className='mb-4 flex w-full max-lg:gap-5 lg:gap-1' key={index}>
                    <div className='w-32'>
                      <Image
                        src={JSON.parse(item.productOptionImageUrl)[0]}
                        alt={'productImg'}
                        width={100}
                        height={100}
                        className='aspect-square rounded-xl object-cover'
                      ></Image>
                    </div>

                    <div className='flex w-full flex-col'>
                      <div className='text-lg'>{item.productName}</div>

                      <div className='flex max-lg:text-sm'>
                        Color: &nbsp;
                        <div className='text-gray1'>{item.productOptionLabel}</div>
                      </div>

                      <div className='flex max-lg:text-sm'>
                        Size: &nbsp;
                        <div className='text-gray1'>{item.productSize}</div>
                      </div>

                      <div className='flex w-full justify-between max-lg:text-sm'>
                        <div className='flex'>
                          Price &nbsp;
                          <div className='text-gray1'>{item.price} THB</div>
                        </div>
                        <div>
                          Qty: &nbsp;
                          {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

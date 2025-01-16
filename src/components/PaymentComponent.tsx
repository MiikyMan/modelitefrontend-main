'use client';
import { IAdressData, IProviceData } from '@/interfaces/address';
import { Button, Modal, Radio, Input } from 'antd';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { GoHome, GoPencil } from 'react-icons/go';
import AddressEditCard from './AddressEditCard';
import SelectAddressCard from './SelectAddressCard';
import { FaCircleCheck } from 'react-icons/fa6';
import { getAddress } from '@/api/address';
import { getVoucher, postOrder } from '@/api/cart';
import { IOrder, IProducts, IVoucherData } from '@/interfaces/cart';
import Image from 'next/image';
import Swal from 'sweetalert2';

interface IProps {
  products: IProducts[];
  address: IAdressData[];
  provinces: IProviceData[];
  onBack: () => void;
}

const PaymentComponent: FC<IProps> = ({ products, address, provinces, onBack }) => {
  const [addresses, setAddress] = useState<IAdressData[]>(address);
  const [selectedAddress, setSelectedAddress] = useState<IAdressData>(addresses.find((item) => item.default === true) ?? addresses[0]);
  const [editAddress, setEditAddress] = useState<IAdressData | undefined>();
  const [editFlag, setEditFlag] = useState<boolean>();
  const [isSelectAddressVisible, setIsSelectAddressVisible] = useState<boolean>(false);
  const [isEditAddressVisible, setIsEditAddressVisible] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [PaymentProcessing, setIsPaymentProcessing] = useState(true);
  const [voucher, setVoucher] = useState<IVoucherData | null>();

  const handleAddressSelect = async (address: IAdressData) => {
    setSelectedAddress(address);
    setIsSelectAddressVisible(false);
  };

  const handleOpenEditAddressModal = async () => {
    setIsEditAddressVisible(true);
  };

  const handleCloseEditAddressModal = async () => {
    setIsEditAddressVisible(false);
    setEditAddress(undefined);
    reFetchAddress();
  };

  const handleOpenSelectModal = async () => {
    setIsSelectAddressVisible(true);
  };

  const reFetchAddress = async () => {
    const address = await getAddress();
    if (address === null) {
      return;
    }
    setAddress(address);
    const updatedSelectedAddress = address.find((item) => item.id === selectedAddress.id);
    if (updatedSelectedAddress) {
      setSelectedAddress(updatedSelectedAddress);
    } else {
      setSelectedAddress(address[0]); // Fallback to the first address if the selected one is not found
    }
  };

  const handleCloseSelectModal = async () => {
    setIsSelectAddressVisible(false);
    // Refetch Address
    reFetchAddress();
  };

  const handleEditValue = async (value: IAdressData | undefined) => {
    setEditAddress(value);
    await handleOpenEditAddressModal();
  };

  const handleApplyPromo = async () => {
    const Voucher = await getVoucher(promoCode);
    setVoucher(Voucher);
    if (Voucher) {
      if (subtotal > Voucher?.minTotalPrice) {
        setDiscount(subtotal * Voucher.percentage > Voucher.maxDiscount ? Voucher.maxDiscount : subtotal * Voucher.percentage);
      }
    }
  };

  const createOrder = async () => {
    if (selectedPayment === undefined) {
      setIsPaymentProcessing(false);
      return;
    }

    const order: IOrder = {
      addressId: Number(selectedAddress.id.toString()),
      products: products.map((item) => {
        return {
          productSizeId: item.productSizeId,
          quantity: item.quantity,
        };
      }),
      shippingPrice: deliveryFee,
      voucherId: voucher?.id ?? '',
    };
    try {
      const orderDetail = await postOrder(order);
      if (orderDetail !== null) {
        Swal.fire({
          icon: 'success',
          title: 'Order Created Successfully',
          text: 'Your order has been created successfully. Please proceed to payment.',
          confirmButtonText: 'Pay Now',
        }).then((result) => {
          if (result.isConfirmed) {
            window.open(`https://pay.sn/wirabyte/${orderDetail.amount}/${orderDetail.orderId}`, '_blank');
            window.location.href = `/fakepayment/${orderDetail.orderId}`;
          }
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
    setIsPaymentProcessing(false);
  };

  useEffect(() => {
    if (editFlag) {
      setIsEditAddressVisible(true);
      setEditFlag(false);
    }
  }, [editAddress]);

  const PaymentWay = [
    {
      id: 1,
      Name: 'Payment by PaySolution',
      imgsrc: 'PaySolution.png',
    },
  ];

  const subtotal = products.reduce((total, product) => total + product.product.productPrice * product.quantity, 0);
  const deliveryFee = 150;
  const total = subtotal + deliveryFee - discount;

  return (
    <>
      {/* Change to Breadcrumb */}
      <div className='flex w-full space-x-2 text-gray-500'>
        {' '}
        <Link href='/' passHref>
          <GoHome style={{ height: '24px', width: '24px' }} />
        </Link>
        <span>{'>'}</span>
        <button onClick={onBack}>
          {' '}
          {/*make it go to the page before */}
          <span className='cursor-pointer hover:underline'>Shopping Cart</span>
        </button>
        <span>{'>'}</span>
        <span className='font-bold text-purple-500'>Payment</span>
      </div>
      <div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-2'>
        <div className='col-span-1 flex w-full flex-col gap-8'>
          <div className='rounded-2xl border border-gray-300 bg-white px-6 py-4'>
            <div className='flex items-center justify-between pb-2'>
              <div className='text-base font-bold md:text-xl'>Address</div>
              <Button
                type='text'
                className='text-purple1'
                onClick={() => {
                  handleOpenEditAddressModal();
                }}
              >
                <GoPencil style={{ width: '20px', height: '20px', color: '#6E62E5' }} />
                <span className='text-purple1'>Edit</span>
              </Button>
            </div>
            <div className='grid grid-cols-10 border-t'>
              <div className='col-span-9 flex flex-col justify-between border-gray-300'>
                <div className='mt-3 text-base font-semibold md:text-xl'>Delivery To</div>
                {selectedAddress ? (
                  <div className='mt-1 text-lg text-black3 md:text-base'>
                    <div>Address: {selectedAddress.phone}</div>
                    <div>
                      {[selectedAddress.address, selectedAddress.subDistrict, selectedAddress.district, selectedAddress.province, selectedAddress.zipCode].join(
                        ', '
                      )}
                    </div>
                  </div>
                ) : (
                  <div className='mt-1 text-lg text-black3 md:text-base'>No address selected</div>
                )}
              </div>
              <div className='flex content-center justify-end'>
                <Button onClick={() => handleOpenSelectModal()} className='my-auto flex' style={{ border: 'none' }}>
                  <FaAngleRight className='color-purple1' />
                </Button>
                {/* Opens Select Address Modal */}
              </div>
            </div>
          </div>
          <div className='flex flex-col rounded-2xl border border-gray-300 bg-white px-6 py-4'>
            <h2 className='border-b pb-2 text-xl font-bold'>Order Details</h2>
            <div className=''></div>
            {products.map((product) => (
              <div key={product.id}>
                <div className='flex w-full flex-col items-start justify-between space-y-4 overflow-hidden py-4 md:flex-row md:items-center md:space-y-0'>
                  <div className='flex w-full flex-col items-center gap-4 md:flex-row md:items-start'>
                    {
                      <Image
                        src={product.product.product_image}
                        alt={product.product.productName}
                        width={150}
                        height={128}
                        className='h-[100px] w-[120px] object-cover md:h-[128px] md:w-[150px]'
                      />
                    }
                    <div className='w-full text-sm'>
                      <div className='font-semibold'>{product.product.productName}</div>
                      <div>
                        Color: <span className='text-gray-500'>{product.product.productOption}</span>
                      </div>
                      <div>
                        Size: <span className='text-gray-500'>{product.product.size}</span>
                      </div>
                      <div className='flex w-full flex-row items-center justify-between'>
                        {' '}
                        {/*แล้วเป็นเหี้ยอะไรไม่ชิดซ้ายขวาให้กูวะ */}
                        <div className='flex w-full justify-between'>
                          <span className='font-normal'>Price : {product.product.productPrice} THB</span>
                          <span className='text-black'>Quantity : {product.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='col-span-1 flex w-full flex-col gap-8'>
          <div className='rounded-2xl border border-gray-300 bg-white'>
            <h2 className='px-6 py-4 text-lg font-semibold md:text-base'>Payment Details</h2>
            <div className='border-b' />
            <Radio.Group
              onChange={(e) => {
                setSelectedPayment(e.target.value);
                setIsPaymentProcessing(false);
              }}
              value={selectedPayment}
              className='w-full'
            >
              {PaymentWay.map((method) => (
                <div key={method.id} className='flex h-[84px] items-center overflow-hidden rounded-2xl p-6'>
                  <Radio value={method.id} className='flex items-center'>
                    <div className='flex items-center'>
                      <div className='p-1'> {/* <img src={method.imgsrc} alt={method.Name} className='mr-4 h-[40px] w-[40px]' />  */}</div>
                      <span>{method.Name}</span>
                    </div>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className='rounded-2xl border border-gray-300 bg-white'>
            <h2 className='px-6 py-4 text-base font-semibold md:text-xl'>Review Item by Stores</h2>
            <div className='mx-6 border-b' />
            <div className='px-6 py-4'>
              {' '}
              <div className='font-semibold'>Promotions</div>
              {/* Applied Coupon Message */}
              {voucher && (
                <div className='mt-2 flex items-center text-sm text-[#46A8E1]'>
                  <FaCircleCheck style={{ height: '20px', width: '20px' }} />
                  <span className=''>
                    Coupon code applied: <strong>{voucher.code}</strong>
                  </span>
                </div>
              )}
              {/* Promo Code Input and Apply Button */}
              <div className='mt-3 flex items-center space-x-2'>
                {/* Input for Promo Code */}
                <Input
                  type='text'
                  placeholder='Enter promo code'
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className='h-[41px] flex-grow rounded-lg border border-gray-300 p-2'
                  status={voucher === null ? 'error' : ''}
                />
                {/* Apply Button */}
                <button onClick={handleApplyPromo} className='rounded-md bg-[#8E85EB] px-4 py-2 text-white'>
                  Apply
                </button>
              </div>
              <div className='py-3 text-red-700'>{voucher === null ? 'Voucher not found or expired' : ''}</div>
              <div className='border-b'></div>
            </div>
            <div className='flex justify-between px-6 text-[#79797A]'>
              <div>Subtotal</div>
              <div>{subtotal} THB</div>
            </div>
            <div className='mt-2 flex justify-between px-6 text-[#79797A]'>
              <div>Shipping</div>
              <div>{deliveryFee} THB</div>
            </div>
            <div className='mt-2 flex justify-between px-6 text-[#79797A]'>
              <div>Promo Discount</div>
              <div>{discount} THB</div>
            </div>
            <div className='mt-6'></div>
            <div className='mx-6 border-b'></div>
            <div className='mt-6 flex justify-between px-6 text-purple1'>
              <div className='text-base font-semibold'>Total</div>
              <div className='text-base font-semibold'>{total} THB</div>
            </div>
            <div className='mx-6 mt-6 border-b'></div>
            <div className='flex justify-center'>
              <Button
                type='primary'
                className='mx-6 mb-6 mt-6 px-4 py-1.5'
                onClick={() => {
                  setIsPaymentProcessing(true);
                  createOrder();
                }}
                style={{ height: '40px' }}
                disabled={PaymentProcessing}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={!isEditAddressVisible && isSelectAddressVisible} onCancel={() => setIsSelectAddressVisible(false)} footer={null} closable={false}>
        <SelectAddressCard
          addresses={addresses} // ตรวจสอบว่าตัวแปรนี้มีค่าถูกต้อง
          selectAddress={selectedAddress}
          onSelect={handleAddressSelect}
          onClose={handleCloseSelectModal}
          onEditAddress={handleOpenEditAddressModal} // ปรับให้เปิดโมดัล Edit Address
          onAddAddress={handleOpenEditAddressModal}
          onEditValue={handleEditValue}
        />
      </Modal>

      <Modal open={isEditAddressVisible} onCancel={handleCloseEditAddressModal} closable={false} footer={null} width={1000}>
        <AddressEditCard object={editAddress} provinces={provinces} onClose={handleCloseEditAddressModal} />
      </Modal>
    </>
  );
};

export default PaymentComponent;

'use client';
import { axiosInstanceClient } from '@/utils/axiosInstanceClient';
import Swal from 'sweetalert2';

const FakePaymentPage = ({ params: { order_id = '' } }: { params: { order_id: string } }) => {
  const FakePayment = async () => {
    try {
      const response = await axiosInstanceClient.post(`/order/fake_payment/${order_id}`);
      if (response.status !== 201) {
        throw new Error('Payment failed');
      }
      Swal.fire({
        icon: 'success',
        title: 'Payment Success',
        text: 'Your payment has been successfully processed',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        location.href = `/setting/order-history/${order_id}`;
      });
    } catch (error) {
      console.error(error);
      location.href = '/';
    }
  };

  return (
    <div className='container mx-auto flex flex-col gap-y-4 py-12 text-center'>
      <h1 className='text-4xl font-bold'>Fake Payment Page</h1>
      <p className='text-xl'>Order ID: {order_id}</p>

      <div className='mt-4'>
        <button
          className='rounded bg-blue-500 px-8 py-4 text-2xl font-bold text-white hover:bg-blue-700'
          onClick={() => {
            FakePayment();
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default FakePaymentPage;

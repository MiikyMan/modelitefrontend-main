import HistoryCard from '@/components/seller/history/HistoryCard';
import { IExpressBody } from '@/interfaces/order';
import { EXPRESS_OPTION, ISellerOrder } from '@/interfaces/seller';
import { updateOrderExpress } from '@/api/order';
import { Button, Input, Modal, Select } from 'antd';
import { FC, useState } from 'react';
import { HiInbox } from 'react-icons/hi';

interface IProps {
  filter: string;
  orders: ISellerOrder[];
}

const HistoryList: FC<IProps> = (props) => {
  const [orderId, setOrderId] = useState<string>('');
  const [body, setBody] = useState<IExpressBody>({
    expressProvider: '',
    expressTrackingCode: '',
  });
  const [deliveryModal, setDeliveryModal] = useState<boolean>(false);

  const openDeliveryModal = () => {
    setDeliveryModal(true);
  };

  const cancelDeliveryModal = () => {
    setDeliveryModal(false);
    setOrderId('');
    setBody({
      expressProvider: '',
      expressTrackingCode: '',
    });
  };

  const onSubmit = async () => {
    try {
      const status = await updateOrderExpress(orderId, body);
      if (status) {
        setDeliveryModal(false);
      } else {
        setDeliveryModal(true);
      }
    } catch (error) {
      console.log(error);
      setDeliveryModal(false);
    } finally {
      setOrderId('');
      setBody({
        expressProvider: '',
        expressTrackingCode: '',
      });
      window.location.reload();
    }
  };

  return (
    <>
      <div className='w-full'>
        {props.orders
          .filter((item) => item.status === props.filter || props.filter === '')
          .map((item) => {
            return (
              <HistoryCard
                key={item.id}
                viewDeliveryDetail={() => {
                  setOrderId(item.id);
                  openDeliveryModal();
                }}
                status={item.status}
                orders={item}
              />
            );
          })}
        {props.orders.filter((item) => item.status === props.filter || props.filter === '').length === 0 ? (
          <div className='w-full p-16 text-gray-400'>
            <div className='mx-auto w-fit'>
              <HiInbox size={64} color='#e5e7eb' />
              <span>No data</span>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Modal open={deliveryModal} closable={false} footer={null} centered onCancel={cancelDeliveryModal} width={592} height={260}>
        <div className='flex flex-col gap-4'>
          <span className='border-b pb-6 text-xl font-bold'>Express</span>
          <div className='grid grid-rows-1 gap-3 pb-6 lg:grid-cols-2'>
            <div className='flex flex-col'>
              <span>Express</span>
              <Select
                size='large'
                placeholder='Thailang Post'
                options={EXPRESS_OPTION}
                onChange={(e) => {
                  setBody({ ...body, expressProvider: e });
                }}
              />
            </div>
            <div className='flex flex-col'>
              <span>Code</span>
              <Input
                size='large'
                placeholder='TH2407313KFEX1NV'
                className='h-full w-full'
                onChange={(e) => {
                  setBody({ ...body, expressTrackingCode: e.target.value });
                }}
              />
            </div>
          </div>
          <div className='flex flex-row justify-center gap-4'>
            <Button
              type='default'
              size='large'
              onClick={() => {
                setDeliveryModal(false);
                setOrderId('');
                setBody({
                  expressProvider: '',
                  expressTrackingCode: '',
                });
              }}
              style={{ backgroundColor: '#BFBFBF', color: '#FFFFFF' }}
            >
              Cancel
            </Button>
            <Button type='primary' size='large' onClick={onSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default HistoryList;

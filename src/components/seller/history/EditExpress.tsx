'use client';

import { EXPRESS_OPTION } from '@/interfaces/seller';
import { updateOrderExpress } from '@/api/order';
import { Button, Form, Input, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';

const EditExpress = (props: { expressProvider: string; expressTrackingNumber: string; orderId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    expressProvider: props.expressProvider || '',
    expressTrackingCode: props.expressTrackingNumber || '',
  });
  const [form] = useForm();

  const onInput = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    form.setFieldsValue({ [name]: value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const status = await updateOrderExpress(props.orderId, formData);
    if (status) {
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className='text-purple1 transition duration-100 hover:text-[#9b8ff2]' onClick={showModal}>
        Edit
      </button>

      <Modal
        title='Express'
        open={isModalOpen}
        closable={false}
        footer={
          <>
            <div className='flex w-full items-center justify-center gap-3'>
              <Button onClick={handleCancel} size='large' type='default'>
                Cancel
              </Button>
              <Button onClick={handleOk} type='primary' size='large'>
                Save
              </Button>
            </div>
          </>
        }
      >
        <hr className='mb-4 w-full bg-black' />
        <Form layout='vertical'>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              label='Express'
              style={{
                flex: 1,
              }}
            >
              <Select defaultValue={props.expressProvider} onChange={(value) => onInput('expressProvider', value)} options={EXPRESS_OPTION} />
            </Form.Item>

            <Form.Item
              label='Code'
              style={{
                flex: 1,
              }}
            >
              <Input placeholder={props.expressTrackingNumber} onChange={(e) => onInput('expressTrackingCode', e.target.value)} />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditExpress;

// http://localhost:3000/seller/d3152242-1ff4-44e5-80bb-c52ed16402dd/order-history/2e9185b5-6bd8-410e-b60f-fe6e84fc451b

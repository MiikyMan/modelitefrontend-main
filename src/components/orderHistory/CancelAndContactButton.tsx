'use client';

import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';

const CancelAndContactButton = (props: { totalAmout: string; role: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {props.role !== 'seller' ? (
        <>
          <Button
            size='large'
            onClick={showModal}
            style={{
              width: '100%',
              color: '#6E62E5',
              borderRadius: '10px',
              borderColor: '#6E62E5',
              backgroundColor: 'transparent',
              fontSize: '16px',
            }}
          >
            Cancel
          </Button>
          <Button
            size='large'
            type='primary'
            style={{
              width: '100%',
              color: 'white',
              borderRadius: '10px',
              fontSize: '16px',
            }}
          >
            Contact
          </Button>
        </>
      ) : (
        <Button
          size='large'
          style={{
            width: '100%',
            color: '#6E62E5',
            borderRadius: '10px',
            borderColor: '#6E62E5',
            backgroundColor: 'transparent',
            fontSize: '16px',
          }}
        >
          Contact
        </Button>
      )}
      <Modal
        title='Cancel order'
        open={isModalOpen}
        closable={false}
        footer={
          <>
            <div className='flex w-full items-center justify-center gap-3'>
              <Button onClick={handleCancel} size='large' type='default'>
                back
              </Button>
              <Button onClick={handleOk} type='primary' size='large'>
                Cancel order
              </Button>
            </div>
          </>
        }
      >
        <hr className='mb-4 w-full bg-black' />
        <p className='text-wrap text-justify text-gray1'>
          Canceling this order will automatically refund this customer the full amount paid of {props.totalAmout} bath.{' '}
        </p>
        <Form layout='vertical'>
          <Form.Item label='Cancel reason'>
            <Input.TextArea placeholder='Reason...' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CancelAndContactButton;

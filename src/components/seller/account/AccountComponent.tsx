'use client';

import { customizeRequiredMark } from '@/components/customReuiredMark';
import { ISeller } from '@/interfaces/seller';
import { isSeller, patchUpdateSeller } from '@/api/seller';
import { axiosInstanceClient } from '@/utils/axiosInstanceClient';
import { Button, Form, Input, Select, Table, TableColumnsType, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import { FC, useEffect, useMemo, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

interface IProps {
  seller_id: string;
  seller_data: ISeller;
}

interface DataType {
  key: React.Key;
  invoice_id: string;
  date: string;
  total: number;
  bank_transfer: string;
}

const AccountComponent: FC<IProps> = (props) => {
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isEditSuccess, setEditSuccess] = useState<boolean>(false);
  const [uploadImages, setUploadImages] = useState<File>();
  const [seller, setSeller] = useState<ISeller>(props.seller_data);

  const uploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    action: '',
    showUploadList: false,
    beforeUpload(file) {
      setUploadImages(file);
      return false;
    },
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Invoice id',
      dataIndex: 'invoice_id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Bank Transfer',
      dataIndex: 'bank_transfer',
    },
  ];

  const bank_list = [
    { value: 'Bangkok bank', label: 'Bangkok bank' },
    { value: 'Bank of Ayudhya', label: 'Bank of Ayudhya' },
    { value: 'Kasikorn bank', label: 'Kasikorn bank' },
    { value: 'Krung thai bank', label: 'Siam commercial bank' },
    { value: 'Siam commercial bank', label: 'Krung thai bank' },
  ];

  const data: DataType[] = props.seller_data.sellerTransaction.map((item, index) => {
    return {
      key: index + 1,
      invoice_id: item.id,
      date: new Date(item.updatedAt).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      }),
      total: item.bankTransactionAmount,
      bank_transfer: item.bankAccountProvider,
    };
  });

  const handleNumber = (value: string, field: string) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      form.setFieldValue(field, value);
    } else {
      form.setFieldValue(field, value.slice(0, -1));
    }
  };

  const uploadImageFn = async () => {
    if (uploadImages) {
      const formData = new FormData();
      formData.append('file', uploadImages);
      await axiosInstanceClient
        .post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          form.setFieldValue('logoUrl', res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    uploadImageFn();
  }, [uploadImages]);

  useMemo(async () => {
    if (!isEditSuccess) {
      return;
    }
    const seller_data = await isSeller(props.seller_id);
    if (typeof seller_data === 'boolean') {
      return;
    }
    setSeller(seller_data);
    setEditSuccess(false);
  }, [isEditSuccess]);

  useMemo(async () => {
    if (isEdit) {
      form.setFieldsValue(seller);
    }
  }, [isEdit]);

  const onFinish = async (value: ISeller) => {
    console.log({ ...value, id: seller.id }, seller);
    const res = await patchUpdateSeller({ ...value, id: seller.id });
    if (res) {
      setSeller({ ...value });
      setEditSuccess(true);
      setIsEdit(false);
    }
  };

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='h-fit w-full gap-y-6 rounded-2xl border border-gray1 border-opacity-25'>
        <div className='flex justify-between border-b px-6 py-4'>
          <h1 className='text-xl font-semibold'>Store detail</h1>
          {!isEdit ? (
            <div className='flex flex-row gap-1 text-purple1' onClick={() => setIsEdit(true)}>
              <AiOutlineEdit className='size-6' /> Edit
            </div>
          ) : (
            <div className='content-center text-lg text-purple1' onClick={() => setIsEdit(false)}>
              Back
            </div>
          )}
        </div>
        {!isEdit ? (
          <>
            <div className='flex flex-col px-6 py-4'>
              <div className='relative h-51 w-full'>
                <div className='h-30 rounded-2xl bg-purple1'>
                  <div className='flex h-fit w-full justify-between p-3 text-white'>
                    <div>
                      <span className='font-bold'>Hello</span>
                      <br />
                      <span>Your Balance</span>
                    </div>
                    <div>
                      <span>0 Bath</span>
                    </div>
                  </div>
                </div>
                <div className='absolute left-1/2 top-20 translate-x-[-50%] rounded-full border-4 border-white'>
                  <Image src={seller.logoUrl || ''} height={100} width={100} alt={`image ${seller.id}`} className='rounded-full' />
                </div>
              </div>
            </div>
            <div className='grid h-fit grid-cols-1 gap-6 p-6 sm:grid-cols-2'>
              <div className='rounded-2xl border border-opacity-25 p-6'>
                <div className='border-b pb-4 text-xl font-bold'>Store detail</div>
                <div className='flex flex-col justify-between gap-4 pt-4'>
                  <div>
                    <span className='font-bold'>Phone</span>
                    <br />
                    <span className='text-gray-400'>{seller.phone}</span>
                  </div>
                  <div>
                    <span className='font-bold'>Location</span>
                    <br />
                    <span className='text-gray-400'>{seller.location}</span>
                  </div>
                  <div>
                    <span className='font-bold'>Description</span>
                    <br />
                    <span className='text-gray-400'>{seller.description}</span>
                  </div>
                </div>
              </div>
              <div className='rounded-2xl border border-opacity-25 p-6'>
                <div className='border-b pb-4 text-xl font-bold'>Bank detail</div>
                <div className='flex flex-col justify-between gap-4 pt-4'>
                  <div>
                    <span className='font-bold'>Preferred name</span>
                    <br />
                    <span className='text-gray-400'>{seller.bankAccountName}</span>
                  </div>
                  <div>
                    <span className='font-bold'>Bank</span>
                    <br />
                    <span className='text-gray-400'>{seller.bankAccountProvider}</span>
                  </div>
                  <div>
                    <span className='font-bold'>Bank Number</span>
                    <br />
                    <span className='text-gray-400'>{seller.bankAccountNumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Form form={form} layout='vertical' className='w-full' requiredMark={customizeRequiredMark} onFinish={onFinish} scrollToFirstError>
            <div className='flex flex-col gap-5 p-6 sm:flex-row'>
              <div className='flex w-fit flex-col items-center gap-5 self-center sm:self-start'>
                <div className='relative flex h-25 w-25 justify-center overflow-hidden rounded-full bg-[#F2F2F2]'>
                  <Image className='rounded-full' src={uploadImages ? URL.createObjectURL(uploadImages) : seller.logoUrl} alt={''} width={224} height={224} />
                </div>
                <div className='flex flex-col self-center'>
                  <Form.Item
                    name='logoUrl'
                    rules={[
                      {
                        required: true,
                        message: 'Please input image!',
                      },
                    ]}
                  >
                    <ImgCrop aspect={256 / 256} rotationSlider>
                      <Upload {...uploadProps}>
                        <Button size='large' type='default' className='w-fit' style={{ color: '#6E62E5', borderColor: '#6E62E5' }}>
                          upload Image
                        </Button>
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <div>
                  <Form.Item
                    name='name'
                    label={<p className='text-bold text-lg'>Name store</p>}
                    required
                    rules={[{ required: true }]}
                    className='h-18 lg:col-span-4'
                  >
                    <Input size='large' placeholder='Name' style={{ padding: '6px 11px' }} />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label={<p className='text-bold text-lg'>Phone</p>}
                    required
                    rules={[{ required: true }]}
                    className='h-18 lg:col-span-4'
                  >
                    <Input size='large' placeholder='(000) 000-0000' onChange={(e) => handleNumber(e.target.value, 'phone')} style={{ padding: '6px 11px' }} />
                  </Form.Item>
                  <Form.Item
                    name='location'
                    label={<p className='text-bold text-lg'>Location</p>}
                    required
                    rules={[{ required: true }]}
                    className='h-18 lg:col-span-4'
                  >
                    <Input size='large' placeholder='Address' style={{ padding: '6px 11px' }} />
                  </Form.Item>
                  <Form.Item
                    name='description'
                    label={<p className='text-bold text-lg'>description</p>}
                    required
                    rules={[{ required: true }]}
                    className='h-18 lg:col-span-4'
                  >
                    <Input size='large' placeholder='description...' style={{ padding: '6px 11px' }} />
                  </Form.Item>
                  <Form.Item
                    name='bankAccountName'
                    label={<p className='text-bold text-lg'>Preferred name</p>}
                    required
                    rules={[{ required: true }]}
                    className='h-18 lg:col-span-4'
                  >
                    <Input size='large' placeholder='Name' style={{ padding: '6px 11px' }} />
                  </Form.Item>
                  <div className='sm:grid sm:grid-cols-2 sm:gap-4'>
                    <div>
                      <Form.Item
                        name='bankAccountProvider'
                        label={<p className='text-bold text-lg'>Bank</p>}
                        required
                        rules={[{ required: true }]}
                        className='h-18 lg:col-span-4'
                      >
                        <Select size='large' placeholder='Provider' options={bank_list} />
                      </Form.Item>
                    </div>
                    <div>
                      <Form.Item
                        name='bankAccountNumber'
                        label={<p className='text-bold text-lg'>Bank Number</p>}
                        required
                        rules={[{ required: true }]}
                        className='h-18 lg:col-span-4'
                      >
                        <Input
                          size='large'
                          placeholder='Account Number'
                          style={{ padding: '6px 11px' }}
                          onChange={(e) => handleNumber(e.target.value, 'bankAccountNumber')}
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className='flex flex-row justify-center gap-4'>
                  <Form.Item>
                    <Button size='large' type='primary' htmlType='submit'>
                      Save
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        )}
      </div>
      {!isEdit ? (
        <div className='h-fit w-full gap-y-6 rounded-2xl border'>
          <div className='flex justify-between border-b px-6 py-4'>
            <h1 className='text-2xl font-semibold'>All Transections</h1>
          </div>
          <div>
            <Table<DataType> columns={columns} dataSource={data} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AccountComponent;

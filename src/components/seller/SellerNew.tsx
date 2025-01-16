'use client';

import { NewUser } from '@/interfaces/seller';
import { postSeller } from '@/api/seller';
import { axiosInstanceClient } from '@/utils/axiosInstanceClient';
import { Button, Form, Input, Select, Upload, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { customizeRequiredMark } from '../customReuiredMark';

const NewSeller: FC = () => {
  const [form] = Form.useForm();
  const [uploadImages, setUploadImages] = useState<File>();
  const router = useRouter();

  const bank_list = [
    { value: 'Bangkok bank', label: 'Bangkok bang' },
    { value: 'Bank of Ayudhya', label: 'Bank of Ayudhya' },
    { value: 'Kasikorn bank', label: 'Kasikorn bank' },
    { value: 'Krung thai bank', label: 'Siam commercial bank' },
    { value: 'Siam commercial bank', label: 'Krung thai bank' },
  ];

  const handleNumber = (value: string, field: string) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      form.setFieldValue(field, value);
    } else {
      form.setFieldValue(field, value.slice(0, -1));
    }
  };

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

  useEffect(() => {
    uploadImageFn();
  }, [uploadImages]);

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

  const onFinish = async (value: NewUser) => {
    const res = await postSeller(value);
    if (res) {
      router.push('/seller');
    }
  };

  const onReset = () => {
    router.push('/seller');
  };

  return (
    <>
      <div className='pb-8 text-center text-2xl font-bold'>create new shop</div>
      <Form form={form} layout='vertical' className='w-full' requiredMark={customizeRequiredMark} onFinish={onFinish} onReset={onReset} scrollToFirstError>
        <div className='flex w-full flex-col gap-8 rounded-2xl bg-white px-6 pt-6'>
          <div className='flex flex-row gap-5'>
            <div className='relative flex h-25 w-25 justify-center overflow-hidden rounded-full bg-[#F2F2F2]'>
              {!uploadImages ? (
                <BiSolidUser className='absolute top-4 rounded-full' size={100} color='#8C8C8C' />
              ) : (
                <Image className='rounded-full' src={URL.createObjectURL(uploadImages)} alt={''} width={100} height={100} />
              )}
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
              <span className='text-gray-400'>png. jpg. Recommented size is 256x256 px.</span>
            </div>
          </div>
          <div>
            <Form.Item name='name' label={<p className='text-bold text-lg'>Name store</p>} required rules={[{ required: true }]} className='h-18 lg:col-span-4'>
              <Input size='large' placeholder='Name' style={{ padding: '6px 11px' }} />
            </Form.Item>
            <Form.Item name='phone' label={<p className='text-bold text-lg'>Phone</p>} required rules={[{ required: true }]} className='h-18 lg:col-span-4'>
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
            <div className='grid grid-cols-2 gap-4'>
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
              <Button size='large' htmlType='reset' style={{ color: '#FFFFFF', border: '0px', backgroundColor: '#BFBFBF' }}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button size='large' type='primary' htmlType='submit'>
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </>
  );
};

export default NewSeller;

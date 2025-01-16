'use client';
import { IProfileData } from '@/interfaces/profile';
import { updateProfile, updateUserInfo } from '@/api/profile';
import { Button, Card, Form, Input } from 'antd';
import Image from 'next/image';
import { FC, useState } from 'react';
import { PiPencilSimpleLine } from 'react-icons/pi';
import ImageCropper from '../ImageCroper';
import { customizeRequiredMark } from '@/components/customReuiredMark';

interface Props {
  userInfo: IProfileData;
}

const SettingProfileCard: FC<Props> = (props) => {
  const [editable, setEditable] = useState(false);
  const [initValue, setInitValue] = useState<IProfileData>(props.userInfo);
  const [form] = Form.useForm();
  const onFinish = async (values: IProfileData) => {
    try {
      const response = await updateUserInfo({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });

      if (response === false) {
        throw new Error('Update user info failed');
      }

      setInitValue(response);
    } catch {
      // modal error
      return;
    } finally {
      setEditable(false);
    }

    setInitValue({ ...values, profileUrl: initValue.profileUrl });
  };

  const editButtonHandler = () => {
    setEditable(!editable);
    form.resetFields();
  };

  const setImageURL = async (url: string) => {
    try {
      const result = await updateProfile({ profileUrl: url });
      if (result === false) {
        throw new Error('Update profile failed');
      }

      setInitValue({
        ...result,
        profileUrl: url,
      });
      return;
    } catch {
      // modal error
      return;
    }
  };

  return (
    <Card
      className='span-4 w-full'
      style={{
        width: '100%',
      }}
      title={
        <div className='flex justify-between'>
          <span>Account Setting</span>
          <Button icon={editable ? '' : <PiPencilSimpleLine />} color='primary' variant='text' onClick={() => editButtonHandler()}>
            {editable ? 'Back' : 'Edit'}
          </Button>
        </div>
      }
    >
      <Form<IProfileData> form={form} layout='vertical' initialValues={initValue} onFinish={onFinish} requiredMark={customizeRequiredMark} scrollToFirstError>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          <div className='col-span-3 grid w-full content-center gap-4 p-2 lg:col-span-1'>
            <div className='relative mx-auto aspect-square w-full min-w-16 max-w-64'>
              <Image
                src={initValue.profileUrl}
                alt='preview-image'
                className='rounded-full'
                layout='fill'
                sizes='(max-width: 400px) 100vw, 400px'
                style={{ objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = '/profile.png';
                }}
              />
            </div>
            <ImageCropper ImageURL={initValue.profileUrl} setImageURL={setImageURL} />
          </div>
          <div className='col-span-3 w-full lg:col-span-2'>
            <div className='grid'>
              {/* Input for 4 item with form */}
              <Form.Item<IProfileData>
                label='First Name'
                name='firstName'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{
                    padding: '0.25rem 0.75rem',
                  }}
                  disabled={!editable}
                  size='large'
                  className=''
                />
              </Form.Item>
              <Form.Item<IProfileData>
                label='Last Name'
                name='lastName'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{
                    padding: '0.25rem 0.75rem',
                  }}
                  disabled={!editable}
                  size='large'
                />
              </Form.Item>
              <Form.Item<IProfileData>
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  style={{
                    padding: '0.25rem 0.75rem',
                  }}
                  disabled={true}
                  type='email'
                  size='large'
                />
              </Form.Item>
              <Form.Item<IProfileData>
                label='Phone'
                name='phone'
                rules={[
                  {
                    required: true,
                    min: 10,
                    max: 10,
                    message: 'Phone number must be 10 digits',
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                    message: 'Phone number must be number',
                  },
                ]}
              >
                <Input
                  style={{
                    padding: '0.25rem 0.75rem',
                  }}
                  minLength={10}
                  maxLength={10}
                  disabled={!editable}
                  size='large'
                />
              </Form.Item>
            </div>
          </div>
          {editable && (
            <Button htmlType='submit' color='primary' variant='solid' size='large' className={`col-span-3 mx-auto`}>
              Save Change
            </Button>
          )}
        </div>
      </Form>
    </Card>
  );
};

export default SettingProfileCard;

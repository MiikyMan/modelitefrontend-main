'use client';
import { IAddressSend, IAdress, IAdressData, IAdressOption, IOnFinish, IProviceData } from '@/interfaces/address';
import { getDistricts, getSubDistricts, postAddress, putAddress } from '@/api/address';
import { Button, Form, Input, Select, Switch } from 'antd';
import { FC, useEffect, useState } from 'react';

interface Addressobject {
  object: IAdressData | undefined;
  provinces: IProviceData[];
  onClose: () => void;
}

interface Previous {
  province: string;
  district: string;
  subDistrict: string;
}

const AddressEditCard: FC<Addressobject> = (props) => {
  const [form] = Form.useForm();
  const { object } = props;
  const [formValue, setFormValue] = useState<IAdress>({
    id: object?.id ?? '',
    firstName: object?.firstName ?? '',
    lastName: object?.lastName ?? '',
    email: object?.email ?? '',
    phone: object?.phone ?? '',
    label: object?.label ?? '',
    default: object?.default ?? false,
    address: object?.address ?? '',
    subDistrict: object?.subDistrict ?? '',
    district: object?.district ?? '',
    province: object?.province ?? '',
    zipCode: object?.zipCode ?? '',
  } as IAdress);

  const provinces_list: { label: string; value: string }[] = props.provinces.map((item) => {
    return { label: item.nameTh, value: item.id };
  });
  const [previous, setPrevious] = useState<Previous>({
    province: object?.province || '',
    district: object?.district || '',
    subDistrict: object?.subDistrict || '',
  });

  const [subDistrict, setSubDistrict] = useState<IAdressOption[]>();
  const [district, setDistrict] = useState<IAdressOption[]>();

  const [disableForm, setDisableForm] = useState<boolean>(false);
  const disableDistrinct = disableForm === false ? previous.province === '' : true;
  const disableSubDistrinct = disableForm === false ? previous.district === '' : true;

  const fetchDistricts = async (provinceId: string) => {
    const districtData = await getDistricts(provinceId);
    if (districtData == null) return;
    setDistrict(districtData.map((item) => ({ label: item.nameTh, value: item.id })));
  };

  const fetchSubDistricts = async (districtId: string) => {
    const subDistrictData = await getSubDistricts(districtId);
    if (subDistrictData == null) return;
    setSubDistrict(subDistrictData.map((item) => ({ label: item.nameTh, value: item.id, zipcode: item.zipcode })));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (object?.province) {
        await fetchDistricts(provinces_list.find((item) => item.label === previous.province)?.value as string);
        if (object?.district) {
          await fetchSubDistricts(district?.find((item) => item.label === previous.district)?.value as string);
          form.setFieldValue('zipCode', subDistrict?.find((item) => item.zipcode === object.zipCode)?.zipcode);
        }
      }
    };
    fetchData();
    setFormValue({
      id: object?.id ?? '',
      firstName: object?.firstName ?? '',
      lastName: object?.lastName ?? '',
      email: object?.email ?? '',
      phone: object?.phone ?? '',
      label: object?.label ?? '',
      default: object?.default ?? false,
      address: object?.address ?? '',
      subDistrict: object?.subDistrict ?? '',
      district: object?.district ?? '',
      province: object?.province ?? '',
      zipCode: object?.zipCode ?? '',
    } as IAdress);
    form.setFieldsValue({
      id: object?.id ?? '',
      firstName: object?.firstName ?? '',
      lastName: object?.lastName ?? '',
      email: object?.email ?? '',
      phone: object?.phone ?? '',
      label: object?.label ?? '',
      default: object?.default ?? false,
      address: object?.address ?? '',
      subDistrict: object?.subDistrict ?? '',
      district: object?.district ?? '',
      province: object?.province ?? '',
      zipCode: object?.zipCode ?? '',
    });
    setDisableForm(false); // Re-enable the form
  }, [object]);

  const onFinish = async (value: IOnFinish) => {
    setDisableForm(true);
    const sendData = {
      address: value.address,
      default: value.default,
      district: typeof value.district !== 'string' ? value.district.label : value.district,
      email: value.email,
      firstName: value.firstName,
      label: value.label,
      lastName: value.lastName,
      phone: value.phone,
      province: typeof value.province !== 'string' ? value.province.label : value.province,
      subDistrict: typeof value.subDistrict !== 'string' ? value.subDistrict.label : value.province,
      zipCode: value.zipCode,
    } as IAddressSend;
    let res;
    if (object?.id === undefined) {
      res = await postAddress(sendData);
    } else {
      res = await putAddress(object.id, sendData);
    }
    if (res === true) {
      props.onClose();
    } else {
      setDisableForm(false);
    }
  };

  const onReset = () => {
    props.onClose();
  };

  return (
    <div className='w-full gap-y-6 rounded-2xl'>
      <div className='flex justify-between border-b pb-6'>
        <span className='font-bold'>Address</span>
        <Button size='small' ghost style={{ color: '#6E62E5' }} onClick={onReset}>
          Back
        </Button>
      </div>
      <div className='flex flex-col gap-y-6 pt-6'>
        <Form form={form} initialValues={formValue} requiredMark='optional' onFinish={onFinish} onReset={onReset} disabled={disableForm}>
          <div className='grid grid-cols-1 gap-6 gap-x-2 sm:gap-y-0 lg:grid-cols-12'>
            <Form.Item label='Label' name='label' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-4'>
              <Select
                placeholder='Label'
                size='large'
                options={[
                  { value: 'Home', label: 'Home' },
                  { value: 'Office', label: 'Office' },
                ]}
              />
            </Form.Item>
            <Form.Item label='First name' name='firstName' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-4'>
              <Input placeholder='First name' className='text-sm' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Last name' name='lastName' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-4'>
              <Input placeholder='Last name' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Address' name='address' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-12'>
              <Input placeholder='Address' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Province' name='province' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-3'>
              <Select
                labelInValue
                placeholder='Province'
                size='large'
                onChange={async (value: { value: string; label: string }) => {
                  if (value.value !== previous.province) {
                    setPrevious({ province: value.value, district: '', subDistrict: '' });
                    form.setFieldsValue({ district: '', zipCode: '', subDistrict: '' });
                    await fetchDistricts(value.value);
                  }
                }}
                options={provinces_list}
              />
            </Form.Item>
            <Form.Item label='District' name='district' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-3'>
              <Select
                labelInValue
                placeholder='District'
                size='large'
                disabled={disableDistrinct}
                onChange={async (value: { value: string; label: string }) => {
                  if (value.value !== previous.district) {
                    setPrevious((prev) => ({ ...prev, district: value.value, subDistrict: '' }));
                    form.setFieldValue('subDistrict', '');
                    form.setFieldValue('zipCode', '');
                    await fetchSubDistricts(value.value);
                  }
                }}
                options={district}
              />
            </Form.Item>
            <Form.Item label='Sub-district' name='subDistrict' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-3'>
              <Select
                labelInValue
                placeholder='Sub-district'
                size='large'
                disabled={disableSubDistrinct}
                onChange={(value: { value: string; label: string }) => {
                  if (value.value !== previous.subDistrict) {
                    setPrevious((prev) => ({ ...prev, subDistrict: value.value }));
                    form.setFieldValue('zipCode', subDistrict?.find((item) => item.value === value.value)?.zipcode);
                  }
                }}
                options={subDistrict}
              />
            </Form.Item>
            <Form.Item label='Zip Code' name='zipCode' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-3'>
              <Input placeholder='Zip Code' size='large' style={{ padding: '6px 0.5rem' }} disabled />
            </Form.Item>
            <Form.Item label='Email' name='email' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-6'>
              <Input placeholder='Example@gmail.com' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Phone Number' name='phone' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-6'>
              <Input placeholder='(603) 000-0000' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Default' name='default' required rules={[{ required: false }]} className='h-18 lg:col-span-12'>
              <Switch />
            </Form.Item>
            <div className='flex flex-row justify-center gap-x-5 lg:col-span-12'>
              <Form.Item className='px-2'>
                <Button htmlType='submit' type='primary'>
                  Save Change
                </Button>
              </Form.Item>
              <Form.Item className='px-2'>
                <Button htmlType='reset' type='default'>
                  Close
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddressEditCard;

'use client';
import { IAddressSend, IAdress, IAdressData, IOnFinish, IAdressOption, IProviceData } from '@/interfaces/address';
import { ISelectOption } from '@/interfaces/input';
import { getDistricts, getSubDistricts, postAddress, putAddress } from '@/api/address';
import { Button, Form, Input, Select, Switch } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  object: IAdressData | undefined;
  provinces: IProviceData[];
  provincesOption: ISelectOption[];
}

interface Previous {
  province: string;
  district: string;
  subDistrict: string;
}

const SettingAddressEdit: FC<Props> = (props) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const object = props.object;
  const formValue = {
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
  } as IAdress;

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
    const districtOption = districtData
      .map((item) => ({ label: item.nameTh, value: item.id }))
      .sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    setDistrict(districtOption);
    return districtOption;
  };

  const fetchSubDistricts = async (districtId: string) => {
    const subDistrictData = await getSubDistricts(districtId);
    if (subDistrictData == null) return;
    const subDistrictOption = subDistrictData
      .map((item) => ({ label: item.nameTh, value: item.id, zipcode: item.zipcode }))
      .sort((a, b) => {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    setSubDistrict(subDistrictOption);
    return subDistrictOption;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (object?.province) {
        const province = props.provincesOption.find((item) => item.label === previous.province)?.value as string;
        const districtPrevious = await fetchDistricts(province);
        if (object?.district) {
          const subDistrictPrevious = await fetchSubDistricts(districtPrevious?.find((item) => item.label === previous.district)?.value as string);
          const ZipCodePrevious = subDistrictPrevious?.find((item) => item.label === previous.subDistrict)?.zipcode;
          form.setFieldValue('zipCode', ZipCodePrevious);
        }
      }
    };
    fetchData();
  }, []);

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
      router.back();
    } else {
      setDisableForm(false);
    }
  };

  return (
    <div className='w-full gap-y-6 rounded-2xl border p-6'>
      <div className='flex justify-between border-b pb-6'>
        <span className='font-bold'>Address</span>
        <Button size='small' ghost style={{ color: '#6E62E5' }} onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div className='flex flex-col gap-y-6 pt-6'>
        <Form form={form} initialValues={formValue} requiredMark='optional' onFinish={onFinish} disabled={disableForm}>
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
                options={props.provincesOption}
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
              <Input autoComplete='on' placeholder='Example@gmail.com' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Phone Number' name='phone' layout='vertical' required rules={[{ required: true }]} className='h-18 lg:col-span-6'>
              <Input autoComplete='on' placeholder='(603) 000-0000' size='large' style={{ padding: '6px 0.5rem' }} />
            </Form.Item>
            <Form.Item label='Default' name='default' required rules={[{ required: false }]} className='h-18 lg:col-span-12'>
              <Switch />
            </Form.Item>
            <Form.Item required rules={[{ required: true }]} className='flex place-content-center lg:col-span-12'>
              <Button htmlType='submit' type='primary'>
                Save Change
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SettingAddressEdit;

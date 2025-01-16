import { IAdressData } from '@/interfaces/address';
import { Button, Radio } from 'antd';
import React, { useState } from 'react';
import { GoPencil } from 'react-icons/go';

interface SelectAddressCardProps {
  addresses: IAdressData[];
  selectAddress: IAdressData;
  onSelect: (address: IAdressData) => void;
  onClose: () => void;
  onEditValue: (value: IAdressData) => void;
  onAddAddress: () => void;
  onEditAddress: () => void;
}

const SelectAddressCard: React.FC<SelectAddressCardProps> = (props) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(props.selectAddress.id);

  const handleSelectChange = (id: string) => {
    setSelectedAddressId(id);
  };

  const handleSubmit = () => {
    const selectedAddress = props.addresses.find((address) => address.id === selectedAddressId);
    if (selectedAddress) {
      props.onSelect(selectedAddress);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-bold'>Select Address</h2>
        <Button
          onClick={() => {
            // props.onEditValue(undefined);
            props.onAddAddress();
          }}
        >
          Add Address
        </Button>
      </div>

      <Radio.Group defaultValue={selectedAddressId} className='w-full'>
        {props.addresses && props.addresses?.length > 0 ? (
          props.addresses.map((address) => (
            <div key={address.id} className='mt-4 flex justify-between border-b border-gray-200 pb-4'>
              <Radio value={address.id} className='flex w-full flex-row' onClick={() => handleSelectChange(address.id)}>
                <div className='flex flex-col'>
                  <div className='font-semibold'>
                    {address.default ? 'Default, ' : ''}
                    {address.label}
                  </div>
                  <div>
                    {address.firstName} {address.lastName}
                  </div>
                  <div>{[address.address, address.subDistrict, address.district, address.province, address.zipCode].join(', ')}</div>
                  <div>{address.phone}</div>
                </div>
              </Radio>
              <Button
                type='text'
                className='text-purple1'
                onClick={async () => {
                  await props.onEditValue(address);
                }}
              >
                <GoPencil style={{ width: '20px', height: '20px', color: '#6E62E5' }} />
                <span className='text-purple1'>Edit</span>
              </Button>
            </div>
          ))
        ) : (
          <div>No addresses available.</div>
        )}
      </Radio.Group>

      <div className='mt-4 flex justify-center'>
        <Button type='primary' onClick={handleSubmit} disabled={selectedAddressId === null}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default SelectAddressCard;

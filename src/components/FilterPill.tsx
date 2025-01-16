import { Filters, FilterValueChild } from '@/interfaces/product';
import { Button } from 'antd';
import { FC } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
type Props = {
  filterKey: string;
  value: FilterValueChild;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
};
const FilterPill: FC<Props> = ({ filterKey, value, setFilter }) => {
  return (
    <div className='flex h-8 gap-x-2 rounded-full border bg-blue-300 px-3 py-1'>
      <span className='text-nowrap'>{value.label}</span>
      <Button
        shape='circle'
        size='small'
        style={{
          backgroundColor: '#6FBBE8',
          color: 'white',
          border: 'none',
        }}
        variant='solid'
        onClick={() => {
          setFilter((prev) => {
            return {
              ...prev,
              [filterKey]: {
                ...prev[filterKey],
                value: prev[filterKey].value.map((val) => {
                  if (val.label === value.label) {
                    return { ...val, checked: false };
                  }
                  return val;
                }),
              },
            };
          });
        }}
      >
        <IoCloseOutline />
      </Button>
    </div>
  );
};

export default FilterPill;

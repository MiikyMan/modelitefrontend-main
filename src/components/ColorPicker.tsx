'use client';
import { IProductOption } from '@/interfaces/product';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ColorPicker = (props: { productOption: IProductOption[]; selectedColor: string }) => {
  const router = useRouter();
  const handleClick = (label: string) => {
    router.push(`?color=${label}`);
  };

  return (
    <div className='flex gap-4'>
      {props.productOption.map((color: IProductOption, index: number) => {
        const firstIndex = JSON.parse(color.imageUrl)[0];
        return (
          <Button
            size='large'
            style={{
              width: '15%',
              objectFit: 'cover',
              height: '100%',
              padding: '0px',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
            variant='outlined'
            color={props.selectedColor === color.label ? 'primary' : 'default'}
            key={index}
            onClick={() => handleClick(color.label)}
          >
            <Image src={firstIndex} alt='color' width={1000} height={1000} className='aspect-square object-cover' />
          </Button>
        );
      })}
    </div>
  );
};

export default ColorPicker;

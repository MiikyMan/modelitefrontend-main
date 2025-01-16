// use searchparam instead of child component useState passing method for easier maintaining.

'use client';
import ColorPicker from '@/components/ColorPicker';
import { IProductOption, IProductSize } from '@/interfaces/product';
import { addToCart } from '@/api/cart';
import { Button, InputNumber, Modal } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

type Props = {
  productOption: IProductOption[];
};

const SizeSelection = (props: Props) => {
  const searchParams = useSearchParams();
  const colorlabel = searchParams.get('color') || props.productOption[0].label;
  const selectedColor = props.productOption.find((item) => item.label === colorlabel) || props.productOption[0];

  const [selectSize, setSelectSize] = useState<number>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenNotSelect, setModalOpenNotSelect] = useState<boolean>(false);
  const [productSizeId, setProductSizeId] = useState<string>();
  const [maxQty, setMaxQty] = useState<number>(1);

  const router = useRouter();

  const handleSendSize = (index: number, item: string, qty: number) => {
    setSelectSize(index);
    setProductSizeId(item);
    setMaxQty(qty);
  };
  const [qty, setQty] = useState<number>(1);
  const onChange = (newQty: number | null) => {
    setQty(newQty ?? qty);
  };

  useEffect(() => {
    setQty(1);
  }, [colorlabel, selectSize]);

  async function handleAddtoCart(ProductSizeId: string, qty: number) {
    try {
      if (!ProductSizeId) {
        setModalOpenNotSelect(true);
        return;
      }

      const result = await addToCart(ProductSizeId, qty);
      if (result) {
        router.push(`/cart`);
      } else {
        setModalOpen(true);
        console.error('Error adding to cart');
      }
    } catch (error) {
      setModalOpen(true);
      console.error('Error adding to cart:', error);
    }
  }

  return (
    <div>
      <ColorPicker productOption={props.productOption} selectedColor={colorlabel} />
      <hr className='mb-4 mt-5' />
      <div className='mb-2 text-base'>Size (US)</div>
      <div className='mb-5 flex flex-wrap gap-3'>
        {selectedColor.productSize.map((item: IProductSize, index: number) => (
          <Button
            key={index}
            className='w-fit rounded-xl border px-4 py-2'
            style={{
              background: selectSize === index ? '#6E62E5' : !item.quantity ? '#f5f5f5' : 'white',
              color: selectSize === index ? 'white' : !item.quantity ? '#c8c8c8' : 'black',
              fontSize: '16px',
            }}
            disabled={!item.quantity}
            size='large'
            onClick={() => handleSendSize(index, item.id, item.quantity)}
          >
            {item.size.size}
          </Button>
        ))}
      </div>
      <hr className='my-3' />
      <div className=''>
        <div className='mb-2 text-base'>Quantity</div>
        <div className=''>
          <div className='flex h-full w-full justify-between gap-4'>
            <div className='h-full w-1/5'>
              <InputNumber
                size='large'
                min={1}
                max={maxQty}
                defaultValue={qty}
                onChange={onChange}
                changeOnWheel
                style={{
                  display: 'flex',
                  width: '100%',
                  fontSize: '16px',
                }}
              />
            </div>
            <div className='h-full w-2/5'>
              <Button
                size='large'
                type='primary'
                style={{
                  width: '100%',
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '16px',
                }}
                onClick={() => handleAddtoCart(productSizeId || '', qty)}
              >
                Buy
              </Button>
            </div>
            <div className='h-full w-2/5'>
              <Button
                size='large'
                type='primary'
                style={{
                  width: '100%',
                  color: 'white',
                  borderRadius: '10px',
                  fontSize: '16px',
                }}
                onClick={() => handleAddtoCart(productSizeId || '', qty)}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal centered closable={false} open={modalOpen} footer={[]}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <IoCloseCircle className='size-20 text-red-500/90' />
          <div className='text-2xl font-bold'>Error!</div>
          <div className='text-center text-lg'>
            Something went wrong. <br />
            Please try again.
          </div>
          <Button
            onClick={() => setModalOpen(false)}
            color='danger'
            variant='solid'
            style={{
              padding: '20px',
            }}
          >
            Try again
          </Button>
        </div>
      </Modal>
      <Modal centered closable={false} open={modalOpenNotSelect} footer={[]}>
        <div className='flex flex-col items-center justify-center gap-4'>
          <IoCloseCircle className='size-20 text-red-500/90' />
          <div className='text-2xl font-bold'>Error!</div>
          <div className='text-center text-lg'>Please select color and size before adding to cart.</div>
          <Button
            onClick={() => setModalOpenNotSelect(false)}
            color='danger'
            variant='solid'
            style={{
              padding: '20px',
            }}
          >
            Try again
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SizeSelection;

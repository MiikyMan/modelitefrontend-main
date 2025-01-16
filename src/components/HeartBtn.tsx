'use client';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { IoHeart } from 'react-icons/io5';
import { addToWishList, getWishList, removeWishList } from '@/api/wishlist';

export default function HeartBtn(props: { pid: string }) {
  const [clicked, setClick] = useState(false);

  const AddFav = async () => {
    try {
      const response = await addToWishList(props.pid);
      if (response === null) {
        setClick(false);
      } else {
        setClick(true);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      setClick(false);
    }
  };

  const DeleteFav = async () => {
    try {
      const response = await removeWishList(props.pid);
      if (response === null) {
        setClick(true);
      } else {
        setClick(false);
      }
    } catch (error) {
      console.error('Error remove from wishlist:', error);
      setClick(true);
    }
  };

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        const response = await getWishList();
        const isLiked = response?.find((item) => item.productId === props.pid);
        if (response === null) {
          setClick(false);
        } else {
          if (isLiked) {
            setClick(true);
          } else {
            setClick(false);
          }
        }
      } catch (error) {
        console.error('Error fetch from wishlist:', error);
        setClick(false);
      }
    };
    fetchWishList();
  }, [props.pid]);

  const handleHover = (e: React.MouseEvent<HTMLElement>, isHovering: boolean) => {
    const button = e.currentTarget as HTMLButtonElement;
    if (!clicked) {
      button.style.color = isHovering ? '#cfcbf6' : 'white';
    }
  };

  const handleClick = () => {
    if (clicked === false) {
      AddFav();
    } else {
      DeleteFav();
    }
  };

  return (
    <Button
      size='small'
      style={{
        color: clicked ? '#6e62e5' : 'white',
        background: '#EFEEFC',
        aspectRatio: '1/1',
        width: '45px',
        height: '45px',
        borderRadius: '16px',
        borderWidth: '0px',
      }}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
      onClick={() => handleClick()}
    >
      <div className='flex aspect-square items-center justify-center'>
        <IoHeart className='size-6' />
      </div>
    </Button>
  );
}

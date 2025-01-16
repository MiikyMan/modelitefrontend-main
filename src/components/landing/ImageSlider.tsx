'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  images: string[];
  className?: string;
  disabledAutoSlide?: boolean;
  intervalTime?: number;
};

const ImageSlider = (props: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [stopAutoSlide, setStopAutoSlide] = useState<boolean>(false);
  const totalImages = props.images.length;
  const intervalTime = props.intervalTime ? props.intervalTime : 3000;

  const nextImage = () => {
    setCurrentIndex(Math.abs(currentIndex + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex(currentIndex <= 0 ? totalImages - 1 : currentIndex - 1);
  };

  const goToImage = (imageIndex: number) => {
    setCurrentIndex(imageIndex);
  };

  useEffect(() => {
    if (!props.disabledAutoSlide && !stopAutoSlide) {
      const interval = setInterval(() => {
        nextImage();
      }, intervalTime);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className='relative h-full w-full'>
      <div
        className={`flex h-full w-full overflow-hidden ${props.className ?? ''}`}
        onMouseEnter={() => setStopAutoSlide(true)}
        onMouseLeave={() => setStopAutoSlide(false)}
      >
        {props.images.map((image, index) => (
          <div key={index} className={'relative h-full w-full flex-shrink-0 flex-grow-0'}>
            <Image
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              fill
              sizes='(max-width: 2000px) 100vw, 2000px'
              alt={index.toString()}
              className={'object-cover transition-all duration-500'}
              src={`${image}`}
              style={{ translate: `${-100 * currentIndex}%` }}
            />
          </div>
        ))}
      </div>
      {totalImages > 1 ? (
        <>
          <button
            key={'next-button'}
            className={`absolute left-4 top-1/2 z-[15] block min-h-8 min-w-8 rounded-full bg-white opacity-75 hover:opacity-90`}
            onClick={prevImage}
            aria-label='image-slider-previous'
          >
            {'<'}
          </button>
          <button
            key={'prev-button'}
            className={`absolute right-4 top-1/2 z-[15] block min-h-8 min-w-8 rounded-full bg-white opacity-75 hover:opacity-90`}
            onClick={nextImage}
            aria-label='image-slider-next'
          >
            {'>'}
          </button>
          <div className='absolute bottom-0 z-[15] w-full'>
            <div className='my-4 flex justify-center'>
              {Array.from({ length: totalImages }, (_, i) => (
                <button
                  key={i}
                  className={`mx-2 h-3 rounded-full duration-300 ease-in-out ${currentIndex === i ? `bg-primary-blue w-6 text-white` : `bg-light-gray w-3 text-gray-700`}`}
                  aria-label={`image-slider-${i + 1}`}
                  onClick={() => goToImage(i)}
                ></button>
              ))}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default ImageSlider;

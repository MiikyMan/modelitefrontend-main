'use client';

import ImageSlider from '@/components/landing/ImageSlider';

export const LandingCarousel: React.FC = () => {
  const bannerItem = ['/banner1.png', '/banner2.png', '/banner3.png'];
  return (
    <div className='aspect-banner w-full'>
      <ImageSlider images={bannerItem} />
    </div>
  );
};

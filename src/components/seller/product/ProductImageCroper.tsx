'use client';
import { axiosInstanceClient } from '@/utils/axiosInstanceClient';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';

type Props = {
  ImageURL: string;
  onChange: (url: string) => void;
};

const ProductImageCroper = (props: Props) => {
  const [uploadImages, setUploadImages] = useState<File>();
  const uploadProps: UploadProps = {
    multiple: true,
    maxCount: 1,
    action: '',
    showUploadList: false,
    beforeUpload(file) {
      setUploadImages(file);
      return false;
    },
  };

  useEffect(() => {
    uploadImageFn();
  }, [uploadImages]);

  const uploadImageFn = async () => {
    if (uploadImages) {
      const formData = new FormData();
      formData.append('file', uploadImages);
      await axiosInstanceClient
        .post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          props.onChange(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className='flex flex-wrap gap-2 py-2'>
      <ImgCrop aspect={1080 / 1080} rotationSlider>
        <Upload {...uploadProps}>
          {!uploadImages ? (
            <div className='flex size-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-purple2 bg-purplebg text-purple1'>
              <GoPlus className='text-3xl font-extrabold' />
              <p>Upload</p>
            </div>
          ) : (
            <>
              <Image src={URL.createObjectURL(uploadImages)} alt='product image' width={144} height={144} className='cursor-pointer rounded-md' />
            </>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ProductImageCroper;

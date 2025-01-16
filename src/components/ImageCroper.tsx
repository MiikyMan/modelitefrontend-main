import { axiosInstanceClient } from '@/utils/axiosInstanceClient';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { BiUpload } from 'react-icons/bi';

type Props = {
  ImageURL: string;
  setImageURL: React.Dispatch<React.SetStateAction<string>> | ((url: string) => void);
};

const ImageCropper = (props: Props) => {
  const [uploadImages, setUploadImages] = useState<File>();
  const uploadProps: UploadProps = {
    multiple: true,
    maxCount: 5,
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
          props.setImageURL(res.data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className='mx-auto'>
      <ImgCrop aspect={600 / 600} rotationSlider>
        <Upload {...uploadProps}>
          {props.ImageURL ? (
            <>
              <Button icon={<BiUpload />} type='primary'>
                Edit Image
              </Button>
            </>
          ) : (
            <Button icon={<BiUpload />}>Upload</Button>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ImageCropper;

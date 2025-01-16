'use server';
import CreateProduct from '@/components/seller/product/CreateProduct';
import { TAG_GROUP_ID } from '@/configs/constant';
import { getAllSize } from '@/api/size';
import { getTags } from '@/api/tag';

export default async function myProduct({ params }: { params: { seller_id: string } }) {
  const size = await getAllSize();
  const brandTags = await getTags(TAG_GROUP_ID.BRAND);
  const categoryTags = await getTags(TAG_GROUP_ID.CATEGORY);

  return (
    <CreateProduct
      sellerId={params.seller_id}
      categoryOption={categoryTags.map((item) => ({
        label: item.label,
        value: item.id,
      }))}
      brandOption={brandTags.map((item) => ({
        label: item.label,
        value: item.id,
      }))}
      sizeOption={size.map((size) => ({ label: size.size, value: size.id }))}
    />
  );
}

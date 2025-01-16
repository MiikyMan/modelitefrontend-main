'use server';
import MyProductList from '@/components/seller/product/MyProductList';
import { getProductBySeller } from '@/api/product';

export default async function myProduct({ params }: { params: { seller_id: string } }) {
  let product = await getProductBySeller(params.seller_id);
  if (!product) {
    product = [];
  }

  return (
    <div className='w-full gap-y-6 rounded-2xl border'>
      <MyProductList sellerId={params.seller_id} product={product} />
    </div>
  );
}

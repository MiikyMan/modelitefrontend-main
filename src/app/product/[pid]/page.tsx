//test URL /product/0c73fd04-d88c-49eb-b7d6-a48267805a19?color=Black
import HeartBtn from '@/components/HeartBtn';
import { ProductCard } from '@/components/ProductCard';
import ProductPicSlideShow from '@/components/ProductPicSlideShow';
import SizeSelection from '@/components/SizeSelection';
import { getProduct, GetProductById } from '@/api/product';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { Metadata } from 'next';

const DefaultMetadata: Metadata = {
  title: 'Product',
  description: 'Product',
  keywords: 'Product',
};

export async function generateMetadata({ params: { pid = '' } }: { params: { pid: string } }) {
  try {
    const product = await GetProductById(pid);
    if (product === null) throw new Error('Product not found');

    const imageUrl: string[] = Array.isArray(JSON.parse(product.productOption[0].imageUrl)) ? JSON.parse(product.productOption[0].imageUrl) : [];

    return {
      title: product.name,
      description: product.description,
      keywords: `${product.name}, ${product.description}`,
      openGraph: {
        title: product.name,
        description: product.description,
        images:
          imageUrl.length > 0
            ? imageUrl.map((url: string) => ({
                url,
                width: 800,
                height: 600,
                alt: product.name,
              }))
            : [],
      },
    } as Metadata;
  } catch {
    return DefaultMetadata;
  }
}

export default async function ViewProduct({ params: { pid = '' } }: { params: { pid: string } }) {
  const product = await GetProductById(pid);
  if (product === null) return <div>Product not found</div>;

  const product_list = (await getProduct()) ?? [];

  return (
    <div className='flex w-full flex-col content-center items-center justify-center gap-y-8 bg-white py-12'>
      <div className='w-9/12 max-lg:w-10/12'>
        <div className='text-3xl'>
          <Breadcrumb
            separator='>'
            items={[
              {
                href: '/home',
                title: <HomeOutlined />,
              },
              {
                href: '/product',
                title: (
                  <>
                    <span>All Product</span>
                  </>
                ),
              },
              {
                title: <div className='text-blue-500'>{product.name}</div>,
              },
            ]}
          />
        </div>

        {/* Product Section */}
        <div className='my-5 grid justify-between gap-12 lg:grid-cols-2'>
          <div className='eounded-xl w-full'>
            <ProductPicSlideShow productOption={product.productOption} />
          </div>
          <div className='flex w-full flex-col gap-2 rounded-xl bg-white'>
            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='text-xl font-extrabold'>{product.name}</div>
                <div className='text-xl'>{product.price} THB</div>
              </div>
              <div className=''>
                <HeartBtn pid={product.id} />
              </div>
            </div>

            <div className='mb-1'>
              <SizeSelection productOption={product.productOption} />
            </div>
            <hr className='my-3' />
            <div className=''>
              <div className='text-base font-bold'>Feature</div>
              {/* this is feature but we don't have it yet */}
              {/* {product.FEATURE.map((items: string, index: number) => (
                <div key={index} className='mt-2'>
                  &nbsp; - {items}
                </div>
              ))} */}
            </div>
            <hr className='my-3' />
            <div>
              <div className='font-bold'>Description</div>
              <div className='mt-2'>{product.description}</div>
            </div>
          </div>
        </div>

        {/* Other Section */}
        <div className='mt-12 space-y-8'>
          <h1 className='text-xl font-bold'>You may also like</h1>
          <div className='flex w-full snap-x gap-6 overflow-x-auto'>
            {product_list.map((product) => (
              <div className='min-w-64 lg:min-w-110' key={`1${product.id}`}>
                <ProductCard id={product.id} name={product.name} price={product.price} image={product.imageUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

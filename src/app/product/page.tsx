'use server';

import AllProduct from '@/components/AllProduct';
import InternalError from '@/components/InternalError';
import { Filters, ISort, Paging } from '@/interfaces/product';
import { getProduct } from '@/api/product';
import { getAllTagGroup } from '@/api/tag';

export default async function AllProductPage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  const sort = (searchParams?.sort as string) ?? 'name:asc';
  const page: number = Number(searchParams?.page as string);
  const perPage: number = Number(searchParams?.perpage as string);

  const all_tag = await getAllTagGroup();
  // filter form url will be a query string
  const filters = Object.fromEntries(
    all_tag.map((tag) => {
      return [tag.name, { name: tag.name, type: 'checkbox', value: tag.value }];
    })
  ) as Filters;

  Object.keys(filters).forEach((key) => {
    const filter = filters[key];
    if (searchParams) {
      filter.value.forEach((value) => {
        if (searchParams[key] && searchParams[key]?.includes(value.label)) {
          value.checked = true;
        }
      });
    }
  });

  const Paging: Paging = {
    page: page || 1,
    perPage: perPage || 10,
  };
  const sortOptions: ISort = {
    sortBy: sort.split(':')[0],
    order: sort.split(':')[1] as 'asc' | 'desc',
  };
  const productList = await getProduct(filters);
  if (productList === null) return <InternalError />;
  return <AllProduct initProductValue={productList} initFilter={filters} initSort={sortOptions} initPage={Paging} />;
}

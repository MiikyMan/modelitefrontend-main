import { ISize } from '@/interfaces/size';

export interface IProductCard {
  id: string;
  name: string;
  price: number;
  image: string;
  tags?: string[];
}

export interface IProduct {
  id: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  status: string;
  imageUrl: string;
  productOption: IProductOption[];
  tags: number[];
  createdAt: string;
  updatedAt: string;
}

export interface IProductOption {
  id: string;
  productSize: IProductSize[];
  label: string;
  imageUrl: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductSize {
  id: string;
  size: ISize;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFilter {
  name: string;
  type: 'checkbox' | 'select';
  value: {
    label: string;
    checked: boolean;
  }[];
}

export interface IFilterArray {
  name: string;
  type: 'checkbox' | 'select';
  value: {
    label: string;
    checked: boolean;
  }[];
}

export interface ISort {
  sortBy: string;
  order: 'asc' | 'desc';
}

export interface FilterValue {
  name: string;
  type: string;
  value: FilterValueChild[];
}

export interface FilterValueChild {
  label: string;
  checked: boolean;
}
export interface Filters {
  [key: string]: FilterValue;
}

export interface Paging {
  page: number;
  perPage: number;
}

export interface ICreateProduct {
  name: string;
  description: string;
  feature: string;
  price: number;
  imageUrl: string;
  productOption: ICreateProductOption[];
  sellerId: string;
  tagId: number[];
}

export interface ICreateProductOption {
  imageUrl: string;
  label: string;
  productSize: ICreateProductSize[];
}

export interface ICreateProductSize {
  quantity: number;
  sizeId: string;
}

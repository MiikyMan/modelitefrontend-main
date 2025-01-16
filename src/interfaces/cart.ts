'use client';
export interface IProducts {
  createdAt: string;
  id: number;
  product: {
    productDescription: string;
    productName: string;
    productOption: string;
    productPrice: number;
    quantity: number;
    size: string;
    seller: string;
    product_image: string;
  };
  productSizeId: string;
  quantity: number;
  updatedAt: string;
  userId: string;
}

export interface IExtendedProduct extends IProducts {
  selected: boolean; // เพิ่ม property selected
}

export interface IVoucherData {
  code: string;
  createdAt: string;
  expiredAt: string;
  id: string;
  maxDiscount: number;
  minTotalPrice: number;
  percentage: number;
  quota: number;
  updatedAt: string;
}

export interface IOrder {
  addressId: number;
  products: {
    productSizeId: string;
    quantity: number;
  }[];
  shippingPrice: number;
  voucherId: string;
}

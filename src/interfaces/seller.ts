export const EXPRESS_OPTION = [
  {
    label: 'Kerry Express',
    value: 'Kerry Express',
  },
  {
    label: 'J&T Express',
    value: 'J&T Express',
  },
  {
    label: 'Flash Express',
    value: 'Flash Express',
  },
  {
    label: 'Thai Express',
    value: 'Thai Express',
  },
  {
    label: 'Lala Move',
    value: 'Lala Move',
  },
  {
    label: 'Ninja Van',
    value: 'Ninja Van',
  },
  {
    label: 'SCG Express',
    value: 'SCG Express',
  },
  {
    label: 'DHL Express',
    value: 'DHL Express',
  },
];

export interface ISeller {
  bankAccountName: string;
  bankAccountNumber: string;
  bankAccountProvider: string;
  createdAt: string;
  description: string;
  id: string;
  isVerify: boolean;
  location: string;
  logoUrl: string;
  name: string;
  ownerId: string;
  phone: string;
  sellerTransaction: SellerTransaction[];
  updateAt: string;
}

export interface SellerTransaction {
  bankAccountName: string;
  bankAccountNumber: string;
  bankAccountProvider: string;
  bankTransactionAmount: number;
  bankTransactionDatetime: string;
  bankTransactionFee: number;
  bankTransactionId: string;
  createdAt: string;
  id: string;
  sellerId: string;
  sellerTransactionOrder: SellerTransactionOrder[];
  updatedAt: string;
}

export interface SellerTransactionOrder {
  createdAt: string;
  orderId: string;
  sellerTransactionId: string;
  updatedAt: string;
}

export interface ISellerOrder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  discouexpressnt: number;
  Provider: string;
  discount: number;
  expressProvider: string;
  expressTrackingNumber: string;
  orderProduct: OrderProduct[];
  orderProductData: OrderProductDaum[];
  productPrice: number;
  sellerPaymentProductAmount: number;
  sellerPaymentShippingAmount: number;
  sellerPaymentStatus: boolean;
  shippingPrice: number;
  status: 'PENDING' | 'PAYMENT_SUCCESS' | 'DELIVERY_ON_THE_WAY' | 'REFUND' | 'END' | 'CANCEL';
  totalPrice: number;
  user: User;
  userId: string;
  voucherCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  createdAt: string;
  id: string;
  orderId: string;
  price: number;
  productSizeId: string;
  quantity: number;
  sellerId: string;
  updatedAt: string;
}

export interface OrderProductDaum {
  createdAt: string;
  id: string;
  orderId: string;
  price: number;
  productDescription: string;
  productImageUrl: string;
  productName: string;
  productOptionImageUrl: string;
  productOptionLabel: string;
  productPrice: number;
  productSize: string;
  productSizeId: string;
  quantity: number;
  sellerId: string;
  sellerLogoUrl: string;
  sellerName: string;
  updatedAt: string;
}

export interface User {
  createdAt: string;
  email: string;
  firstName: string;
  google_id: string;
  id: string;
  lastName: string;
  phone: string;
  profileUrl: string;
  role: string;
  updateAt: string;
}
export interface NewUser {
  bankAccountName: string;
  bankAccountNumber: string;
  bankAccountProvider: string;
  description: string;
  location: string;
  logoUrl: string;
  name: string;
  phone: string;
}

export interface IDashBoard {
  orderSizeDashboard: OrderSizeDashboard[];
  productDashboard: ProductDashboard[];
  totalOrder: number;
  totalOrderAmount: number;
  totalOrderProductUnit: number;
  totalOrderUser: number;
}

export interface OrderSizeDashboard {
  quantity: number;
  size: string;
}

export interface ProductDashboard {
  productName: string;
  quantity: number;
}

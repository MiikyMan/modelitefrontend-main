export interface IAdress {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  label: string;
  default: boolean;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  zipCode: string;
}
export interface IAdressDataGet {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  label: string;
  default: boolean;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  zipCode: string;
  createdAt: string;
  updateAt: string;
}

export interface IAdressData {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  label: string;
  default: boolean;
  address: string;
  subDistrict: string;
  district: string;
  province: string;
  zipCode: string;
  createdAt: string;
  updateAt: string;
}

export interface IProviceData {
  id: string;
  nameTh: string;
}

export interface ISubDistrictsData {
  id: string;
  nameTh: string;
  districtId: string;
  zipcode: string;
}

export interface IDistrictsData {
  id: string;
  nameTh: string;
  provinceId: string;
}

export interface IAddressSend {
  address: string;
  default: boolean;
  district: string;
  email: string;
  firstName: string;
  label: string;
  lastName: string;
  phone: string;
  province: string;
  subDistrict: string;
  zipCode: string;
}

interface FinishValue {
  disabled: boolean;
  key: string;
  label: string;
  title: string;
  value: string;
}

export interface IOnFinish {
  address: string;
  default: boolean;
  district: FinishValue | string;
  email: string;
  firstName: string;
  label: string;
  lastName: string;
  phone: string;
  province: FinishValue | string;
  subDistrict: FinishValue | string;
  zipCode: string;
}

export interface IAdressOption {
  label: string;
  value: string;
  zipcode?: string;
}

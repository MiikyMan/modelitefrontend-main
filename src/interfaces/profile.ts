export interface IProfileData {
  id: string;
  email: string;
  google_id: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileUrl: string;
  role: string;
  updateAt: string;
  createdAt: string;
}

export interface IProfileUpdateInfo {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IProfileUpdateProfile {
  profileUrl: string;
}

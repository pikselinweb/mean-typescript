export interface USER {
  _id?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  profession?: string;
  address?: string;
  web?: string;
  userPhoto?: any;
  hashedPassword?: string;
  profilePicture?: PROFILEPICTURE;
}

export interface USERHTTP {
  user: USER;
  token: string;
}
export interface PROFILEPICTURE {
  url: string;
  public_id: string;
}

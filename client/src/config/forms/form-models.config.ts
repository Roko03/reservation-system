import { UserRoleName } from '@/model/user.model';

export interface UpdateUserFormValues {
  role: UserRoleName;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repassword: string;
  phoneNumber: string;
}

export interface ContactFormValues {
  email: string;
  message: string;
}

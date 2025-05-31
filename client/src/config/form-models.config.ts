import { UserRoleName } from '@/model/user.model';

export interface UpdateUserFormValues {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRoleName;
}

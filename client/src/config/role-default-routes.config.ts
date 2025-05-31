import { UserRoleName } from '@/model/user.model';

export const roleDefaultRoute: Record<UserRoleName, string> = {
  [UserRoleName.USER]: '/',
  [UserRoleName.SUPERADMIN]: '/admin',
  [UserRoleName.ADMIN]: '/admin',
};

import { UserRoleName } from '@/model/user.model';

export const roleGuard = (acquiredRole: UserRoleName, requiredRoles?: UserRoleName[]) => {
  if (!requiredRoles?.length) {
    return true;
  }

  return requiredRoles.includes(acquiredRole);
};

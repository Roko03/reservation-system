import { UserRole, UserRoleName } from '@/model/user.model';

export const roleGuard = (acquiredRoles: readonly UserRole[], requiredRoles?: UserRoleName[]) => {
  if (!requiredRoles?.length) {
    return true;
  }

  return acquiredRoles.some(({ roleName }) => requiredRoles?.includes(roleName));
};

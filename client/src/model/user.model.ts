export enum UserRoleName {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const USER_ROLE_NAME_LABEL_MAP = {
  [UserRoleName.SUPERADMIN]: 'Superadmin',
  [UserRoleName.ADMIN]: 'Admin',
  [UserRoleName.USER]: 'User',
} as const;

export const USER_ROLE_ARRAY = [UserRoleName.SUPERADMIN, UserRoleName.ADMIN, UserRoleName.USER];

export interface UserModel {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  role: UserRoleName;
  createdAt?: string;
  updatedAt?: boolean;
}

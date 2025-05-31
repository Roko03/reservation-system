export enum UserRoleName {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const USER_ROLE_NAME_LABEL_MAP = {
  [UserRoleName.SUPERADMIN]: 'common.superadmin',
  [UserRoleName.ADMIN]: 'common.admin',
  [UserRoleName.USER]: 'common.user',
} as const;

export type UserRole = {
  roleName: UserRoleName;
};

export const USER_ROLE_ARRAY = [
  { roleName: UserRoleName.SUPERADMIN },
  { roleName: UserRoleName.ADMIN },
  { roleName: UserRoleName.USER },
];

export interface UserModel {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage: string;
  role: UserRole[];
  createdAt?: string;
  updatedAt?: boolean;
}

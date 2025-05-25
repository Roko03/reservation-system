import { ElementType } from 'react';

import { UserRoleName } from '@/model/user.model';

export interface NavigationLinkChild {
  id: string;
  path: string;
  accessLevel: UserRoleName[];
  icon?: ElementType;
}

export interface NavigationLink {
  id: string;
  accessLevel?: UserRoleName[];
  path?: string;
  children?: NavigationLinkChild[];
}

const navigation: NavigationLink[] = [
  {
    id: 'home',
    path: '/',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'objects',
    path: '/objects',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'admin-home',
    path: '/admin',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-objects',
    path: 'admin/objects',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-users',
    path: 'admin/users',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-reservations',
    path: 'admin/reservations',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-calendar',
    path: 'admin/calendar',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
];

export default navigation;

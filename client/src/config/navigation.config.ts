import { ElementType } from 'react';

import { Calendar, Home, Objects, Reservations, Users } from '@/components/SvgIcons/Navigation';
import { UserRoleName } from '@/model/user.model';

export interface NavigationLinkChild {
  id: string;
  path: string;
  accessLevel: UserRoleName[];
  icon?: ElementType;
}

export interface NavigationLink {
  id: string;
  icon?: ElementType;
  accessLevel?: UserRoleName[];
  path?: string;
  text: string;
  children?: NavigationLinkChild[];
}

const navigation: NavigationLink[] = [
  {
    id: 'home',
    path: '/',
    icon: Home,
    text: 'Home',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'objects',
    path: '/objects',
    icon: Objects,
    text: 'Objects',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'admin-home',
    path: '/admin',
    icon: Home,
    text: 'Home',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-objects',
    path: '/admin/objects',
    icon: Objects,
    text: 'Objects',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-users',
    path: '/admin/users',
    icon: Users,
    text: 'Users',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-reservations',
    path: '/admin/reservations',
    icon: Reservations,
    text: 'Reservations',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-calendar',
    path: '/admin/calendar',
    icon: Calendar,
    text: 'Calendar',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
];

export default navigation;

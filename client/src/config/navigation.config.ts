import { ElementType } from 'react';

import { CalendarMonthOutlined, Event } from '@mui/icons-material';

import { Home, Objects, Users } from '@/components/SvgIcons/Navigation';
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
    text: 'Naslovna',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'objects',
    path: '/objects',
    icon: Objects,
    text: 'Objekti',
    accessLevel: [UserRoleName.USER],
  },
  {
    id: 'admin-home',
    path: '/admin',
    icon: Home,
    text: 'Naslovna',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-objects',
    path: '/admin/objects',
    icon: Objects,
    text: 'Objekti',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-users',
    path: '/admin/users',
    icon: Users,
    text: 'Korisnici',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-reservations',
    path: '/admin/reservations',
    icon: Event,
    text: 'Rezervacije',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
  {
    id: 'admin-calendar',
    path: '/admin/calendar',
    icon: CalendarMonthOutlined,
    text: 'Kalendar',
    accessLevel: [UserRoleName.ADMIN, UserRoleName.SUPERADMIN],
  },
];

export default navigation;

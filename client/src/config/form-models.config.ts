import { Dayjs } from 'dayjs';

import { UnavailablePeriod } from '@/model/unvailable.model';
import { UserRoleName } from '@/model/user.model';

export interface UpdateUserFormValues {
  firstname: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRoleName;
}

export interface ObjectFormValues {
  name: string;
  location: string;
  image?: string;
  workTimeFrom: Dayjs | null;
  workTimeTo: Dayjs | null;
  type: string;
  terrainType: string;
  unvailableDates?: UnavailablePeriod[];
}

export interface CreateObjectTimeStringFormValues {
  name: string;
  location: string;
  image?: string;
  workTimeFrom: string;
  workTimeTo: string;
  type: string;
  terrainType: string;
  unvailableDates?: UnavailablePeriod[];
}

export interface CreateReservationFormValues {
  date: Dayjs | null;
  time: string;
}

export interface UpdateReservationFormValues extends CreateReservationFormValues {}

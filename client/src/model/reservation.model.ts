export enum ReservationStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export const RESERVATION_STATUS_LABEL_MAP = {
  [ReservationStatus.APPROVED]: 'Prihvaceno',
  [ReservationStatus.PENDING]: 'U tijeku',
  [ReservationStatus.REJECTED]: 'Odbijena',
} as const;

export const RESERVATION_STATUS_ARRAY = [
  ReservationStatus.APPROVED,
  ReservationStatus.PENDING,
  ReservationStatus.REJECTED,
];

export interface UserSummary {
  firstname: string;
  lastName: string;
  email: string;
}

export interface ObjectSummary {
  name: string;
  location: string;
}

export interface ReservationModel {
  id: string;
  date: string;
  time: string;
  status: ReservationStatus;
  user: UserSummary;
  object: ObjectSummary;
}

export interface ReservationFilters {
  objectId?: string;
  status?: ReservationStatus;
  dateFrom?: string;
  dateTo?: string;
}

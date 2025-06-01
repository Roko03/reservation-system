import { PAGE_SIZE } from '@/config/constants.config';
import { ReservationStatus } from '@/model/reservation.model';

export const createQueryParams = ({
  pageNumber,
  pageSize = PAGE_SIZE,
  search = '',
  objectId,
  status,
  dateFrom,
  dateTo,
}: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  objectId?: string;
  status?: ReservationStatus;
  dateFrom?: string;
  dateTo?: string;
}): string => {
  const params = new URLSearchParams(
    Object.entries({
      pageSize,
      currentPage: pageNumber,
      search: search.trim() || undefined,
      objectId,
      status,
      dateFrom,
      dateTo,
    })
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  return `?${params.toString()}`;
};

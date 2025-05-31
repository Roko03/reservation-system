import { PAGE_SIZE } from '@/config/constants.config';

export const createQueryParams = ({
  pageNumber,
  pageSize = PAGE_SIZE,
  search = '',
}: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}): string => {
  const params = new URLSearchParams(
    Object.entries({
      pageSize,
      currentPage: pageNumber,
      search: search.trim() || undefined,
    })
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)])
  );

  return `?${params.toString()}`;
};

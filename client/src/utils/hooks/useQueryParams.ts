import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PAGE_NUMBER, SortDirection } from '@/config/constants.config';

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || PAGE_NUMBER);
  const [searchString, setSearchString] = useState<string>(searchParams.get('search') || '');
  const [sortByString, setSortByString] = useState<string>(searchParams.get('sortBy') || '');
  const [sortDirectionString, setSortDirectionString] = useState<SortDirection>(
    (searchParams.get('sortDirection') as SortDirection) || 'asc'
  );

  useEffect(() => {
    const page = Number(searchParams.get('page')) || PAGE_NUMBER;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || '';
    const sortDirection = (searchParams.get('sortDirection') as SortDirection) || 'asc';

    setPageNumber(page);
    setSearchString(search);
    setSortByString(sortBy);
    setSortDirectionString(sortDirection);
  }, [searchParams]);

  const handlePageChange = (selectedPage: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (selectedPage === 1) {
        newParams.delete('page');
      } else {
        newParams.set('page', String(selectedPage));
      }

      return newParams;
    });
  };

  const handleSearch = (searchValue: string) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete('page');

      if (searchValue) {
        newParams.set('search', searchValue);
      } else {
        newParams.delete('search');
      }

      return newParams;
    });
  };

  const handleSort = (sortBy: string, sortDirection: SortDirection) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      if (sortBy === sortByString && sortDirection === 'asc') {
        newParams.delete('sortBy');
        newParams.delete('sortDirection');
      } else {
        newParams.set('sortBy', sortBy);
        newParams.set('sortDirection', sortDirection);
      }

      return newParams;
    });
  };

  return {
    pageNumber,
    searchString,
    sortByString,
    sortDirectionString,
    handlePageChange,
    handleSearch,
    handleSort,
  };
};

export default useQueryParams;

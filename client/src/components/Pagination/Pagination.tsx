import React from 'react';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import MuiPagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

interface PaginationProps {
  page: number;
  onChange: (page: number) => void;
  count: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, onChange, count }) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, selectedPage: number) => {
    onChange(selectedPage);
  };

  return (
    <Grid container alignItems="center" justifyContent="space-between" mt={2}>
      <Typography variant="body2">
        Page {page} of {count}
      </Typography>
      <MuiPagination
        shape="rounded"
        count={count}
        onChange={handlePageChange}
        page={page}
        showFirstButton
        showLastButton
        renderItem={item => (
          <PaginationItem
            {...item}
            components={{
              previous: KeyboardArrowLeft,
              next: KeyboardArrowRight,
              first: KeyboardDoubleArrowLeft,
              last: KeyboardDoubleArrowRight,
            }}
          />
        )}
      />
    </Grid>
  );
};

export default Pagination;

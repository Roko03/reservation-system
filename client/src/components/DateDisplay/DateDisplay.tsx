import React from 'react';

import { Box, Typography } from '@mui/material';

import styles from './DateDisplay.module.scss';

interface DateDisplayProps {
  date: string | undefined;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => (
  <Box className={styles.container}>
    <Typography variant="body3">{date || 'Datum nije odabran'}</Typography>
  </Box>
);

export default DateDisplay;

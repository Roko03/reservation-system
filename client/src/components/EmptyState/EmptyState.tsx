import React from 'react';

import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

interface EmptyStateProps {
  isOpen: boolean;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isOpen, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Typography variant="body2" align="center">
        {message}
      </Typography>
    </Paper>
  );
};

export default EmptyState;

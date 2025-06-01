import React from 'react';

import { IconButton, IconButtonProps } from '@mui/material';

import styles from './IconButtonRounded.module.scss';

const IconButtonRounded = React.forwardRef<HTMLButtonElement, IconButtonProps>(({ children, ...props }, ref) => (
  <IconButton ref={ref} classes={{ root: styles.root }} className={styles.container} {...props}>
    {children}
  </IconButton>
));

export default IconButtonRounded;

import { PropsWithChildren } from 'react';

import { Container, Typography } from '@mui/material';

import styles from './MainHeroSection.module.scss';

interface MainHeroSectionProps extends PropsWithChildren {
  title: string;
  description?: string;
}

const MainHeroSection = ({ title, description, children }: MainHeroSectionProps) => (
  <Container maxWidth={false} component="section" classes={{ root: styles.root }} className={styles.container}>
    <Container maxWidth="xl" className={styles.content}>
      <Typography variant="hero" textTransform="uppercase">
        {title}
      </Typography>
      {description && (
        <Typography component="p" variant="h1" fontWeight={400} maxWidth={502} pt={3}>
          {description}
        </Typography>
      )}
      {children}
    </Container>
  </Container>
);

export default MainHeroSection;

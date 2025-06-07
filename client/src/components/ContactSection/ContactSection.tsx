import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Container, Divider, Grid, Typography } from '@mui/material';

import socials from '@/config/socials.config';
import colors from '@/styles/themes/colors';

import ContactForm from './ContactForm';
import styles from './ContactSection.module.scss';

const ContactSection = () => (
  <Container component="section" maxWidth={false} className={styles.container}>
    <Typography component="p" variant="hero" textAlign="center" color={colors.black50} py={4}>
      Kontaktiraj nas
    </Typography>
    <Grid container spacing={2} pb={4} margin="auto" maxWidth={850}>
      {socials.map(({ icon: Icon, label, slug }) => (
        <Grid size={{ xs: 12, md: 4 }}>
          <Link to={slug} target="_blank">
            <Button
              size="large"
              variant="outlined"
              fullWidth
              sx={{
                color: colors.black50,
                borderColor: colors.black50,

                '&:hover': {
                  color: colors.green200,
                  backgroundColor: colors.black50,
                },
              }}
              startIcon={<Icon />}
            >
              {label}
            </Button>
          </Link>
        </Grid>
      ))}
    </Grid>
    <ContactForm />
    <Divider className={styles.divider} />
    <Typography variant="body2" textAlign="center" color={colors.black50} pt={2}>
      © All right reserved
    </Typography>
  </Container>
);

export default ContactSection;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Stack, Typography } from '@mui/material';

import Layout from '@/components/Layout';
import AuthService from '@/services/auth.service';

import styles from './Verify.module.scss';

const Verify = () => {
  const [verifyMessage, setVerifyMessage] = useState<string>('');
  const { id } = useParams();

  const verifyUser = async (token: string) => {
    const { payload, message } = await AuthService.verify(token);

    if (payload) {
      setVerifyMessage(message!);

      return;
    }

    setVerifyMessage('Verifikacijski token ne postoji');
  };

  useEffect(() => {
    if (id) {
      verifyUser(id);
    }
  }, [id]);

  if (!id) {
    return (
      <Layout>
        <Container maxWidth="xl" className={styles.container}>
          <Stack height="100dvh" width="100%" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography variant="h2">Token ne postoji</Typography>
          </Stack>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="xl" className={styles.container}>
        <Stack height="100dvh" width="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="h2">{verifyMessage}</Typography>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Verify;

import { Button, Container, IconButton, InputAdornment, Stack } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Layout from '@/components/Layout';
import EyeClosed from '@/components/SvgIcons/EyeClosed';
import EyeOpen from '@/components/SvgIcons/EyeOpen';
import { LoginFormValues } from '@/config/forms/form-models.config';
import AuthService from '@/services/auth.service';
import useToggleState from '@/utils/hooks/useToggleState';
import { FormValidator } from '@/utils/static/FormValidator';
import { setToken } from '@/valtio/auth/auth.actions';
import { showToast } from '@/valtio/global/global.actions';

import styles from './Login.module.scss';

const defaultValues: LoginFormValues = {
  email: '',
  password: '',
};
const Login = () => {
  const [passwordVisibility, togglePasswordVisibility] = useToggleState();

  const handleLogin = async (formValues: LoginFormValues) => {
    const { payload, message } = await AuthService.login(formValues);

    setToken(payload);
    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Login successful' : message || 'Login failed',
    });
  };

  const handleSubmit = async (formValues: LoginFormValues): Promise<void> => {
    handleLogin(formValues);
  };

  return (
    <Layout>
      <Container maxWidth="xl" className={styles.container}>
        <Stack height="100dvh" width="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Form defaultValues={defaultValues} onSubmit={handleSubmit} className={styles.form}>
            {({ formState: { isSubmitting } }) => (
              <Stack direction="column" spacing={2}>
                <FormInput
                  name="email"
                  formLabel="Email"
                  placeholder="Email"
                  type="email"
                  fullWidth
                  className={styles.input}
                  validate={FormValidator.all(FormValidator.isNotEmpty, FormValidator.isValidEmail)}
                />
                <FormInput
                  name="password"
                  type={passwordVisibility ? 'text' : 'password'}
                  formLabel="Password"
                  placeholder="Password"
                  fullWidth
                  className={styles.input}
                  validate={FormValidator.isNotEmpty}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {passwordVisibility ? <EyeClosed /> : <EyeOpen />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'Prijava...' : 'Prijavi se'}
                </Button>
              </Stack>
            )}
          </Form>
        </Stack>
      </Container>
    </Layout>
  );
};

export default Login;

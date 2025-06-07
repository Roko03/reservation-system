import { Button, Container, IconButton, InputAdornment, Stack } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import Layout from '@/components/Layout';
import EyeClosed from '@/components/SvgIcons/EyeClosed';
import EyeOpen from '@/components/SvgIcons/EyeOpen';
import { SignUpFormValues } from '@/config/forms/form-models.config';
import AuthService from '@/services/auth.service';
import useToggleState from '@/utils/hooks/useToggleState';
import { FormValidator } from '@/utils/static/FormValidator';
import { showToast } from '@/valtio/global/global.actions';

import styles from './SignUp.module.scss';

const defaultValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repassword: '',
  phoneNumber: '',
};
const SignUp = () => {
  const [passwordVisibility, togglePasswordVisibility] = useToggleState();

  const handleRegister = async (formValues: SignUpFormValues) => {
    const { payload, message } = await AuthService.register(formValues);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload
        ? 'Registracija uspjesna, verifikacijski kod je poslan na mail'
        : message || 'Registracija nije uspjesna',
    });
  };

  const handleSubmit = async (formValues: SignUpFormValues): Promise<void> => {
    handleRegister(formValues);
  };

  return (
    <Layout>
      <Container maxWidth="xl" className={styles.container}>
        <Stack height="100dvh" width="100%" flexDirection="column" alignItems="center" justifyContent="center">
          <Form defaultValues={defaultValues} onSubmit={handleSubmit} className={styles.form}>
            {({ formState: { isSubmitting } }) => (
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <FormInput
                    name="firstName"
                    formLabel="Ime"
                    placeholder="Ime"
                    type="text"
                    fullWidth
                    className={styles.input}
                    validate={FormValidator.isNotEmpty}
                  />
                  <FormInput
                    name="lastName"
                    formLabel="Prezime"
                    placeholder="Prezime"
                    type="text"
                    fullWidth
                    className={styles.input}
                    validate={FormValidator.isNotEmpty}
                  />
                </Stack>
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
                <FormInput
                  name="repassword"
                  type={passwordVisibility ? 'text' : 'password'}
                  formLabel="Repeat Password"
                  placeholder="Repeat Password"
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
                <FormInput
                  name="phoneNumber"
                  formLabel="Phone number"
                  placeholder="Phone number"
                  type="text"
                  fullWidth
                  className={styles.input}
                  validate={FormValidator.isNotEmpty}
                />
                <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'Registracija...' : 'Registriraj se'}
                </Button>
              </Stack>
            )}
          </Form>
        </Stack>
      </Container>
    </Layout>
  );
};

export default SignUp;

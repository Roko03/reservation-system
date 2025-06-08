import { Button, Stack } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { ProfileFormValues } from '@/config/forms/form-models.config';
import { UserModel } from '@/model/user.model';
import MeService from '@/services/me.service';
import colors from '@/styles/themes/colors';
import { FormValidator } from '@/utils/static/FormValidator';
import { setToken, setUser } from '@/valtio/auth/auth.actions';
import { authStore, useAuthStore } from '@/valtio/auth/auth.store';
import { showToast } from '@/valtio/global/global.actions';

import styles from './ProfileForm.module.scss';

const defaultValues: ProfileFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  profileImage: '',
  phoneNumber: '',
};

const ProfileForm = () => {
  const { user } = useAuthStore();

  const initialValues: ProfileFormValues = user
    ? {
        firstName: user.firstname,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
      }
    : defaultValues;

  const handleSubmit = async (data: ProfileFormValues): Promise<void> => {
    if (!user) {
      return;
    }

    const { payload, message } = await MeService.updateProfile(data);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Profil je uspjesno ureden' : message || 'Doslo je do pogreske prilikom uredivanja profila',
    });

    if (payload) {
      authStore.user = payload as UserModel;
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!user) {
      return;
    }

    const { payload, message } = await MeService.deleteProfile();

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Profil obrisan' : message || 'Doslo je do pogreske prilikom brisanja profila',
    });

    if (payload) {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <Stack className={styles.container}>
      <Form defaultValues={initialValues} onSubmit={handleSubmit} className={styles.form}>
        {({ formState: { isSubmitting } }) => (
          <Stack direction="column" spacing={2}>
            <Stack direction="row" spacing={2}>
              <FormInput
                name="firstName"
                formLabel="Ime"
                placeholder="Ime"
                type="text"
                fullWidth
                validate={FormValidator.isNotEmpty}
              />
              <FormInput
                name="lastName"
                formLabel="Prezime"
                placeholder="Prezime"
                type="text"
                fullWidth
                validate={FormValidator.isNotEmpty}
              />
            </Stack>
            <FormInput
              name="email"
              formLabel="Email"
              placeholder="Email"
              type="email"
              fullWidth
              validate={FormValidator.all(FormValidator.isNotEmpty, FormValidator.isValidEmail)}
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
            <Stack direction="row" spacing={2}>
              <Button
                type="button"
                size="large"
                onClick={handleDelete}
                disabled={isSubmitting}
                fullWidth
                sx={{
                  backgroundColor: colors.red100,
                  '&:hover': {
                    backgroundColor: colors.orange,
                  },
                }}
              >
                {isSubmitting ? 'Brisanje korisnika...' : 'Izbrisi racun'}
              </Button>
              <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Uredivanje...' : 'Uredi'}
              </Button>
            </Stack>
          </Stack>
        )}
      </Form>
    </Stack>
  );
};

export default ProfileForm;

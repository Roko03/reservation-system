import React from 'react';

import { Button, Stack } from '@mui/material';

import Form from '@/components/Forms/Form';
import FormInput from '@/components/Forms/FormInput';
import { ContactFormValues } from '@/config/forms/form-models.config';
import MailService from '@/services/mail.service';
import colors from '@/styles/themes/colors';
import { FormValidator } from '@/utils/static/FormValidator';
import { showToast } from '@/valtio/global/global.actions';

const defaultValues: ContactFormValues = {
  email: '',
  message: '',
};

const ContactForm = () => {
  const handleSubmit = async (formValues: ContactFormValues): Promise<void> => {
    const { payload, message } = await MailService.contactMe(formValues);

    showToast({
      status: payload ? 'success' : 'error',
      text: payload ? 'Upit je poslan' : message || 'Prilikom slanja upita doslo je do greske',
    });
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      margin="auto"
      maxWidth={850}
      padding={4}
      borderRadius={3}
      sx={{ backgroundColor: colors.black50 }}
    >
      <Form defaultValues={defaultValues} onSubmit={handleSubmit}>
        {({ formState: { isSubmitting } }) => (
          <>
            <Stack direction="column" spacing={2} pb={2}>
              <FormInput
                variant="outlined"
                name="email"
                formLabel="Email"
                placeholder="Email"
                type="email"
                fullWidth
                validate={FormValidator.all(FormValidator.isNotEmpty, FormValidator.isValidEmail)}
              />
              <FormInput
                variant="outlined"
                multiline
                name="message"
                formLabel="Poruka"
                placeholder="Poruka"
                type="text"
                fullWidth
                validate={FormValidator.isNotEmpty}
              />
            </Stack>
            <Button type="submit" size="large" disabled={isSubmitting}>
              {isSubmitting ? 'Slanje...' : 'Posalji'}
            </Button>
          </>
        )}
      </Form>
    </Stack>
  );
};

export default ContactForm;

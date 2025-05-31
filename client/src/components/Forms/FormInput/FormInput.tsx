import { JSX } from 'react';
import { Controller, ControllerProps, FieldError, Validate, useFormContext } from 'react-hook-form';

import { FormControl, FormLabel, TextField, TextFieldProps } from '@mui/material';

export interface FormInputProps<T = string> extends Omit<TextFieldProps, 'name'> {
  name: ControllerProps['name'];
  formLabel?: string | JSX.Element;
  validate?: Validate<T, unknown> | Record<string, Validate<T, unknown>>;
  renderInput?: (field: Parameters<ControllerProps['render']>[0] & { error?: string }) => JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedError = (name: string, errors: any): FieldError | undefined =>
  name.split(/[.[\]]+/).reduce((acc, key) => acc?.[key], errors);

function FormInput<T = string>({
  name,
  formLabel,
  validate,
  renderInput,
  helperText,
  ...props
}: FormInputProps<T>): JSX.Element {
  const { control } = useFormContext();

  const render: ControllerProps['render'] = (p): JSX.Element => {
    const error = getNestedError(name, p.formState.errors) as FieldError | undefined;
    const hasError = Boolean(error);

    if (renderInput) {
      return renderInput({ ...p, error: error?.message });
    }

    return (
      <FormControl fullWidth>
        {formLabel && <FormLabel htmlFor={name}>{formLabel}</FormLabel>}
        <TextField
          {...props}
          {...p.field}
          id={name}
          error={hasError}
          helperText={hasError ? error?.message : helperText}
        />
      </FormControl>
    );
  };

  return <Controller name={name} control={control} rules={{ validate }} render={render} />;
}

export default FormInput;

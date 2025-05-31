import { JSX, KeyboardEvent } from 'react';
import { Controller, ControllerProps, FieldError, Validate, useFormContext } from 'react-hook-form';

import { FormControl, FormLabel, TextField, TextFieldProps } from '@mui/material';

export interface FormInputNumberProps<T = string> extends Omit<TextFieldProps, 'name' | 'type'> {
  name: ControllerProps['name'];
  formLabel?: string | JSX.Element;
  validate?: Validate<T, unknown> | Record<string, Validate<T, unknown>>;
  renderInput?: (field: Parameters<ControllerProps['render']>[0] & { error?: string }) => JSX.Element;
}

const handleNumericKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.ctrlKey || event.metaKey) return;

  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
  ];

  if ((event.key >= '0' && event.key <= '9') || event.key === '.' || allowedKeys.includes(event.key)) {
    return;
  }

  event.preventDefault();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getNestedError = (name: string, errors: any): FieldError | undefined =>
  name.split(/[.[\]]+/).reduce((acc, key) => acc?.[key], errors);

function FormInputNumber<T = string>({
  name,
  formLabel,
  validate,
  renderInput,
  helperText,
  ...props
}: FormInputNumberProps<T>): JSX.Element {
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
          type="number"
          {...props}
          {...p.field}
          value={p.field.value ?? ''}
          slotProps={{
            ...props.slotProps,
            input: {
              inputProps: {
                inputMode: 'numeric',
                min: 0,
                pattern: '[0-9]*',
                onKeyDown: handleNumericKeyPress,
              },
            },
          }}
          id={name}
          error={hasError}
          helperText={hasError ? error?.message : helperText}
        />
      </FormControl>
    );
  };

  return <Controller name={name} control={control} rules={{ validate }} render={render} />;
}

export default FormInputNumber;

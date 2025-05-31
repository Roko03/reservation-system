import React, { JSX, useEffect } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';

type HtmlFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
export type FormSubmitHandler<T extends FieldValues> = (data: T, methods: UseFormReturn<T>) => void | Promise<void>;

export type FormProps<TValues extends FieldValues = {}> = UseFormProps<TValues> &
  Omit<HtmlFormProps, 'onSubmit' | 'children'> & {
    onSubmit: FormSubmitHandler<TValues>;
    children: React.ReactNode | ((props: UseFormReturn<TValues>) => React.ReactNode);
    resetDefaultValues?: boolean;
  };

function Form<TValues extends FieldValues>({
  onSubmit: onSubmitProp,
  children,
  mode = 'all',
  context,
  criteriaMode,
  defaultValues,
  reValidateMode,
  resolver,
  shouldFocusError,
  shouldUnregister,
  resetDefaultValues = false,
  ...props
}: FormProps<TValues>): JSX.Element {
  const methods = useForm({
    mode,
    context,
    criteriaMode,
    defaultValues,
    reValidateMode,
    resolver,
    shouldUnregister,
    shouldFocusError,
  });

  useEffect(() => {
    if (resetDefaultValues) {
      methods.reset(defaultValues as TValues);
    }
  }, [resetDefaultValues, methods, defaultValues]);

  const onSubmit: SubmitHandler<TValues> = values => onSubmitProp(values, methods);

  return (
    <FormProvider {...methods}>
      <form {...props} onSubmit={methods.handleSubmit(onSubmit)}>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
}

export default Form;

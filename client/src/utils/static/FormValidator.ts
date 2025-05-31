import Validator from 'validator';

export const acceptedMimeTypes = '.pdf,application/pdf,image/heic,image/png,image/jpg,image/jpeg';

export const acceptedImageTypes = 'image/heic,image/png,image/jpg,image/jpeg';

export const acceptedAppendixTypes = '.pdf,application/pdf';

type ValidationFn<T = string> = (value?: T) => string | true;

export class FormValidator {
  public static all<T = string>(...validationFns: ValidationFn<T>[]): ValidationFn<T> {
    return value => {
      const errors = validationFns.map(fn => fn(value));

      return errors.find(e => e !== true) || true;
    };
  }

  public static skipValidation: ValidationFn = () => true;

  public static isNotEmpty: ValidationFn = value => (Validator.isEmpty(value || '') ? 'Required' : true);

  public static isValidEmail: ValidationFn = value => (Validator.isEmail(value || '') ? true : 'Invalid email address');

  public static isMinimum: ValidationFn<number> = value => (value !== undefined && value > 0) || 'Minimum is 1';

  public static isWholeNumber: ValidationFn = value => {
    const num = String(value);

    return /^\d+$/.test(num || '') ? true : 'Must be a whole number';
  };
}

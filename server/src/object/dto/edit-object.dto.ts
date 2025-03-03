import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isWorkTimeValid', async: false })
export class IsWorkTimeValid implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;

    if (!obj.workTimeFrom || !obj.workTimeTo) {
      return true;
    }

    return obj.workTimeFrom < obj.workTimeTo;
  }

  defaultMessage(_: ValidationArguments) {
    return 'Vrijeme početka rada mora biti manje od vremena završetka rada';
  }
}

export class EditObjectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Unesite ispravan URL slike' })
  image?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Radno vrijeme mora biti u formatu HH:mm',
  })
  workTimeFrom?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Radno vrijeme mora biti u formatu HH:mm',
  })
  workTimeTo?: string;

  @Validate(IsWorkTimeValid)
  workTimeValidation?: boolean;

  @IsOptional()
  @IsArray()
  unavailablePeriods?: {
    startDate: string;
    endDate: string;
  }[];
}

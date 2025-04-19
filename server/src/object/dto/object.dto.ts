import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isWorkTimeValid', async: false })
class IsWorkTimeValid implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as any;
    const toMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
    return toMinutes(obj.workTimeFrom) < toMinutes(obj.workTimeTo);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Vrijeme početka rada mora biti manje od vremena završetka rada';
  }
}

class UnavailablePeriodDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

export class ObjectDto {
  @IsString()
  @IsNotEmpty({ message: 'Unesite naziv' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Unesite lokaciju' })
  location: string;

  @IsUrl({}, { message: 'Unesite ispravan URL slike' })
  @IsNotEmpty({ message: 'Unesite URL slike' })
  image: string;

  @IsString()
  @IsNotEmpty({ message: 'Unesite radno vrijeme od' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Radno vrijeme mora biti u formatu HH:mm',
  })
  workTimeFrom: string;

  @IsString()
  @IsNotEmpty({ message: 'Unesite radno vrijeme do' })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'Radno vrijeme mora biti u formatu HH:mm',
  })
  workTimeTo: string;

  @Validate(IsWorkTimeValid)
  workTimeValidation?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnavailablePeriodDto)
  unavailablePeriods?: UnavailablePeriodDto[];
}

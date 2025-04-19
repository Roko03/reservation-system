import { IsDateString } from 'class-validator';

export class EditReservationDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

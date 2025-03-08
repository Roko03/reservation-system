import { IsDateString } from 'class-validator';

export class ReservationDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

import { IsDateString, Matches } from 'class-validator';

export class ReservationDto {
  @IsDateString()
  date: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format',
  })
  time: string;
}

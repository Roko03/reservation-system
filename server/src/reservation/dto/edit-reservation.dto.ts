import { IsBoolean, IsDateString, IsNotEmpty } from 'class-validator';

export class EditReservationDto {
  @IsBoolean()
  @IsNotEmpty()
  approved: boolean;
}

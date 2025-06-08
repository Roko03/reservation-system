import { IsDateString, IsString } from 'class-validator';

export class GetAvailableTimesDto {
  @IsString()
  objectId: string;

  @IsDateString()
  date: string;
}

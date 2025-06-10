import { IsString } from 'class-validator';

export class ContactDto {
  @IsString()
  email: string;

  @IsString()
  text: string;
}

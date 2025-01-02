import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Unesite ime' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Unestie prezime' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Unesite email' })
  email: string;

  @IsNotEmpty({ message: 'Unesite broj mobitela' })
  phoneNumber: string;
}

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Unesite ime' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Unestie prezime' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Unesite email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Unesite šifru' })
  @Length(4, 255, { message: 'Lozinka mora imati između 4 i 255 znakova' })
  password: string;

  @IsNotEmpty({ message: 'Unesite broj mobitela' })
  phoneNumber: string;
}

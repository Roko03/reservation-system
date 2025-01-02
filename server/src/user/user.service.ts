import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: 'tx7n329750phz58v9cp1pzly',
      },
      data: {
        firstname: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
      },
    });

    return user;
  }
}

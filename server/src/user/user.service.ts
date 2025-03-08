import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRoleDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profileImage: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async editUser(userId: string, dto: UpdateRoleDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('Korisnik ne postoji');

    if (user.role === 'SUPERADMIN')
      throw new UnauthorizedException('Nije moguće urediti korisnika');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { role: dto.role },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Korisnik uspješno ažuriran',
    };
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('Korisnik ne postoji');

    if (user.role === 'SUPERADMIN')
      throw new UnauthorizedException('Nije moguće izbrisati korisnika');

    await this.prisma.user.delete({ where: { id: user.id } });

    return {
      statusCode: HttpStatus.OK,
      message: 'Korisnik uspješno izbrisan',
    };
  }
}

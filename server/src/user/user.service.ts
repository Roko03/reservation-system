import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRoleDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(userId: string, dto: UpdateRoleDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new ForbiddenException('Korisnik ne postoji');

    if (userExists.role === 'SUPERADMIN')
      throw new UnauthorizedException('Nije moguće urediti korisnika');

    return await this.prisma.user.update({
      where: { id: userExists.id },
      data: { role: dto.role },
    });
  }

  async deleteUser(userId: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new ForbiddenException('Korisnik ne postoji');

    if (userExists.role === 'SUPERADMIN')
      throw new UnauthorizedException('Nije moguće urediti korisnika');

    await this.prisma.user.delete({
      where: {
        id: userExists.id,
      },
    });
    return 'Korisnik uspješno izbrisan';
  }
}

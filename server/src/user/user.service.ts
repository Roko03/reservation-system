import {
  BadRequestException,
  ForbiddenException,
  Injectable,
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
    if (!userExists) {
      throw new ForbiddenException('Korisnik ne postoji');
    }

    return await this.prisma.user.update({
      where: { id: userId },
      data: { role: dto.role },
    });
  }

  async deleteUser(userId: string) {
    try {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return 'Korisnik uspješno izbrisan';
    } catch (error) {
      throw new ForbiddenException('Korisnik ne postoji');
    }
  }
}

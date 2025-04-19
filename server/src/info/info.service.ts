import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InfoService {
  constructor(private prisma: PrismaService) {}

  async getInfo() {
    const objectsCount = await this.prisma.object.count();
    const usersCount = await this.prisma.user.count();
    const reservationsCount = await this.prisma.reservation.count();

    return {
      numberOfObjects: objectsCount,
      numberOfUsers: usersCount,
      numberOfReservations: reservationsCount,
    };
  }
}

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

  async getReservationsByMonth(year?: number) {
    const currentYear = year || new Date().getFullYear();

    const reservations = await this.prisma.reservation.findMany({
      where: {
        date: {
          gte: new Date(`${currentYear}-01-01`),
          lt: new Date(`${currentYear + 1}-01-01`),
        },
      },
      select: {
        date: true,
      },
    });

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthCounts = Array(12).fill(0);

    reservations.forEach((reservation) => {
      const month = reservation.date.getMonth(); // 0-11
      monthCounts[month]++;
    });

    return {
      year: currentYear,
      months: monthNames,
      counts: monthCounts,
      total: reservations.length,
    };
  }
}

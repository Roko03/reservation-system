import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditReservationDto } from './dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async getAllReservations(
    pageSize: number,
    currentPage: number,
    filters: {
      objectId?: string;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
    },
  ) {
    let skip = currentPage * pageSize;

    const where: any = {};

    if (filters.objectId) where.objectId = filters.objectId;
    if (filters.status) where.status = filters.status;

    if (filters.dateFrom || filters.dateTo) {
      where.startDate = {};

      if (filters.dateFrom) where.startDate.gte = new Date(filters.dateFrom);
      if (filters.dateTo) where.startDate.lte = new Date(filters.dateTo);
    }

    return this.prisma.reservation.findMany({
      where,
      take: pageSize,
      skip,
      select: {
        id: true,
        startDate: true,
        endDate: true,
        status: true,
        user: {
          select: { firstname: true, lastName: true, email: true },
        },
        object: { select: { name: true, location: true } },
      },
    });
  }

  async approveReservation(id: string, dto: EditReservationDto) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne postoji');

    await this.prisma.$transaction([
      this.prisma.reservation.update({
        where: { id },
        data: {
          status: dto.approved
            ? ReservationStatus.APPROVED
            : ReservationStatus.REJECTED,
        },
      }),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: dto.approved
        ? 'Rezervacija je uspješno prihvaćena'
        : 'Rezervacija je odbijena',
    };
  }
}

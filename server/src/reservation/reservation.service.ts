import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditReservationDto } from './dto';
import { ReservationStatus } from '@prisma/client';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async getAllReservations() {
    return this.prisma.reservation.findMany({
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

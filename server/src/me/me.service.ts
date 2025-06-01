import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditReservationDto } from './dto';

@Injectable()
export class MeService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        firstname: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserReservation(
    userId: string,
    pageSize: number,
    currentPage: number,
  ) {
    let skip = currentPage * pageSize;

    return this.prisma.reservation.findMany({
      where: { userId },
      take: pageSize,
      skip,
      select: {
        id: true,
        date: true,
        time: true,
        object: { select: { id: true, name: true, location: true } },
      },
    });
  }

  async getUserReservationById(userId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId, userId },
      select: {
        id: true,
        date: true,
        time: true,
        object: { select: { id: true, name: true, location: true } },
      },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne postoji');

    return reservation;
  }

  async editUserReservationsById(
    userId: string,
    reservationId: string,
    dto: EditReservationDto,
  ) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId, userId },
    });

    if (!reservation) {
      throw new NotFoundException('Rezervacija ne postoji');
    }

    const object = await this.prisma.object.findUnique({
      where: { id: reservation.objectId },
      include: { unavailablePeriods: true },
    });

    if (!object) {
      throw new NotFoundException('Objekt ne postoji');
    }

    const date = new Date(dto.date);
    date.setHours(0, 0, 0, 0);

    const [hours, minutes] = dto.time.split(':').map(Number);
    const time = new Date(0); // Epoch start
    time.setUTCHours(hours, minutes, 0, 0);

    const isSameDateTime =
      date.getTime() === reservation.date.getTime() &&
      time.getTime() === reservation.time.getTime();

    if (isSameDateTime) {
      throw new BadRequestException('Nema promjena u rezervaciji.');
    }

    const isUnavailable = object.unavailablePeriods.some(
      (period) =>
        date <= new Date(period.endDate) && date >= new Date(period.startDate),
    );

    if (isUnavailable) {
      throw new ForbiddenException('Objekt nije dostupan u odabranom terminu.');
    }

    const overlappingReservation = await this.prisma.reservation.findFirst({
      where: {
        objectId: reservation.objectId,
        NOT: { id: reservationId },
        date,
        time,
      },
    });

    if (overlappingReservation) {
      throw new ForbiddenException('Termin je već zauzet.');
    }

    await this.prisma.reservation.update({
      where: { id: reservationId, userId },
      data: {
        date,
        time,
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Rezervacija uspješno uređena',
    };
  }

  async deleteUserReservationsById(userId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId, userId },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne postoji');

    await this.prisma.reservation.delete({ where: { id: reservationId } });

    return {
      statusCode: HttpStatus.OK,
      message: 'Rezervacija uspješno izbrisana',
    };
  }
}

import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditReservationDto, EditUserDto } from './dto';
import { Response } from 'express';

@Injectable()
export class MeService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        isVerified: true,
        userAgent: true,
      },
    });
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('Korisnik ne postoji');

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        firstname: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        profileImage: dto.profileImage,
        phoneNumber: dto.phoneNumber,
      },
      select: {
        id: true,
        firstname: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        isVerified: true,
        userAgent: true,
      },
    });

    return {
      message: 'Korisnik uspješno ažuriran',
      payload: updatedUser,
    };
  }

  async deleteUser(userId: string, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('Korisnik ne postoji');

    await this.prisma.user.delete({ where: { id: user.id } });

    res.cookie('refreshToken', '', {
      sameSite: 'none',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });

    res.clearCookie('refreshToken');

    return {
      statusCode: HttpStatus.OK,
      message: 'Korisnik uspješno izbrisan',
    };
  }

  async getUserReservation(
    userId: string,
    pageSize: number,
    currentPage: number,
  ) {
    const skip = currentPage * pageSize;

    const [entities, totalCount] = await this.prisma.$transaction([
      this.prisma.reservation.findMany({
        where: { userId },
        take: pageSize,
        skip,
        select: {
          id: true,
          date: true,
          time: true,
          status: true,
          object: {
            select: {
              id: true,
              name: true,
              location: true,
              image: true,
              workTimeFrom: true,
              workTimeTo: true,
            },
          },
        },
      }),
      this.prisma.reservation.count({
        where: { userId },
      }),
    ]);

    return {
      entities,
      totalCount,
    };
  }

  async getUserReservationById(userId: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId, userId },
      select: {
        id: true,
        date: true,
        time: true,
        object: {
          select: { id: true, name: true, location: true, image: true },
        },
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
    const time = new Date(0);
    time.setUTCHours(hours, minutes, 0, 0);

    const isSameReservation =
      date.getTime() === reservation.date.getTime() &&
      time.getTime() === reservation.time.getTime();

    if (isSameReservation) {
      throw new BadRequestException('Nema promjena u rezervaciji.');
    }

    const isUnavailable = object.unavailablePeriods.some(
      (period) =>
        date <= new Date(period.endDate) && date >= new Date(period.startDate),
    );

    if (isUnavailable) {
      throw new ForbiddenException('Objekt nije dostupan u odabranom terminu.');
    }

    const overlappingReservation = await this.prisma.reservation.findUnique({
      where: {
        objectId_date_time: {
          objectId: reservation.objectId,
          date,
          time,
        },
      },
    });

    if (overlappingReservation && overlappingReservation.id !== reservationId) {
      throw new ForbiddenException('Termin je već zauzet.');
    }

    await this.prisma.reservation.update({
      where: { id: reservationId, userId },
      data: {
        objectId: reservation.objectId,
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

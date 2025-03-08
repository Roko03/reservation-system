import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditObjectDto, ObjectDto, ReservationDto } from './dto';

@Injectable()
export class ObjectService {
  constructor(private prisma: PrismaService) {}

  async getAllObjectsName(pageSize: number, currentPage: number) {
    let skip = currentPage * pageSize;

    const objects = await this.prisma.object.findMany({
      take: pageSize,
      skip,
      select: {
        id: true,
        name: true,
      },
    });

    return objects;
  }

  async getAllObjects() {
    return this.prisma.object.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        workTimeFrom: true,
        workTimeTo: true,
        unavailablePeriods: {
          select: { startDate: true, endDate: true },
        },
      },
    });
  }

  async createObject(dto: ObjectDto) {
    await this.prisma.object.create({
      data: {
        ...dto,
        unavailablePeriods: {
          create:
            dto.unavailablePeriods?.map((period) => ({
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
            })) ?? [],
        },
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Objekt uspješno kreiran',
    };
  }

  async getObject(id: string) {
    const object = await this.prisma.object.findUnique({ where: { id } });

    if (!object) throw new NotFoundException('Objekt ne postoji');

    return object;
  }

  async editObject(id: string, dto: EditObjectDto) {
    const object = await this.prisma.object.findUnique({ where: { id } });

    if (!object) throw new NotFoundException('Objekt ne postoji');

    if (
      dto.workTimeFrom &&
      dto.workTimeTo &&
      dto.workTimeFrom >= dto.workTimeTo
    ) {
      throw new HttpException(
        'Vrijeme početka rada mora biti manje od vremena završetka rada.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateData = Object.fromEntries(
      Object.entries(dto).filter(
        ([_, value]) => value !== undefined && value !== '',
      ),
    );

    await this.prisma.object.update({
      where: { id },
      data: {
        ...updateData,
        unavailablePeriods: {
          create:
            updateData.unavailablePeriods?.map((period) => ({
              startDate: new Date(period.startDate),
              endDate: new Date(period.endDate),
            })) ?? [],
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Objekt uspješno uređen',
    };
  }

  async deleteObject(id: string) {
    const object = await this.prisma.object.findUnique({ where: { id } });

    if (!object) throw new NotFoundException('Objekt ne postoji');

    await Promise.all([
      this.prisma.unavailablePeriod.deleteMany({ where: { objectId: id } }),
      this.prisma.reservation.deleteMany({ where: { objectId: id } }),
      this.prisma.object.delete({ where: { id } }),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: 'Objekt uspješno izbrisan',
    };
  }

  async getReservationsByObject(
    objectId: string,
    pageSize: number,
    currentPage: number,
  ) {
    const objectExists = await this.prisma.object.findUnique({
      where: { id: objectId },
    });

    if (!objectExists) throw new NotFoundException('Objekt ne postoji');

    let skip = currentPage * pageSize;

    return this.prisma.reservation.findMany({
      where: { objectId },
      take: pageSize,
      skip,
      select: {
        id: true,
        startDate: true,
        endDate: true,
        user: {
          select: { firstname: true, lastName: true, email: true },
        },
      },
    });
  }

  async createReservation(
    userId: string,
    objectId: string,
    dto: ReservationDto,
  ) {
    const objectExists = await this.prisma.object.findUnique({
      where: { id: objectId },
      include: { unavailablePeriods: true },
    });

    if (!objectExists) throw new NotFoundException('Objekt ne postoji');

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    const isUnavailable = objectExists.unavailablePeriods.some(
      (period) => startDate <= period.endDate && endDate >= period.startDate,
    );

    if (isUnavailable) {
      throw new ForbiddenException('Objekt nije dostupan u odabranom terminu');
    }

    const isOverlapping = await this.prisma.reservation.findFirst({
      where: {
        objectId,
        OR: [{ startDate: { lte: endDate }, endDate: { gte: startDate } }],
      },
    });

    if (isOverlapping) throw new ForbiddenException('Termin je već zauzet');

    const reservation = await this.prisma.reservation.create({
      data: {
        userId,
        objectId,
        startDate,
        endDate,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Rezervacija uspješno kreirana',
      data: reservation,
    };
  }

  async deleteReservation(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) throw new NotFoundException('Rezervacija ne postoji');

    await this.prisma.reservation.delete({ where: { id } });

    return {
      statusCode: HttpStatus.OK,
      message: 'Rezervacija uspješno izbrisana',
    };
  }
}

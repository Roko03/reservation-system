import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  EditObjectDto,
  GetAvailableTimesDto,
  ObjectDto,
  ReservationDto,
} from './dto';
import { Reservation } from '@prisma/client';

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

  async getAllObjects(
    pageSize: number,
    currentPage: number,
    search?: string,
    city?: string,
    type?: string,
    terrainType?: string,
  ) {
    const skip = currentPage * pageSize;
    const where: any = {};

    const andConditions: any[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
        ],
      });
    }

    if (city) {
      andConditions.push({
        location: { contains: city, mode: 'insensitive' },
      });
    }

    if (type) {
      andConditions.push({
        type: { contains: type, mode: 'insensitive' },
      });
    }

    if (terrainType) {
      andConditions.push({
        terrainType: { contains: terrainType, mode: 'insensitive' },
      });
    }

    if (andConditions.length > 0) {
      where.AND = andConditions;
    }

    const [objects, totalCount] = await this.prisma.$transaction([
      this.prisma.object.findMany({
        where,
        take: pageSize,
        skip,
        select: {
          id: true,
          name: true,
          location: true,
          image: true,
          workTimeFrom: true,
          workTimeTo: true,
          type: true,
          terrainType: true,
          unavailablePeriods: {
            select: { startDate: true, endDate: true },
          },
        },
      }),
      this.prisma.object.count({ where }),
    ]);

    return {
      entities: objects,
      totalCount,
    };
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
    const object = await this.prisma.object.findUnique({
      where: { id },
      include: {
        unavailablePeriods: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

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
        date: true,
        time: true,
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
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Reservation;
  }> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Korisnik ne postoji');
    }

    const object = await this.prisma.object.findUnique({
      where: { id: objectId },
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

    const existing = await this.prisma.reservation.findUnique({
      where: {
        objectId_date_time: {
          objectId,
          date,
          time,
        },
      },
    });

    if (existing) {
      throw new ForbiddenException('Termin je već zauzet');
    }

    const reservation = await this.prisma.reservation.create({
      data: {
        userId,
        objectId,
        date,
        time,
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

  async getAvailableTimes(dto: GetAvailableTimesDto) {
    const { objectId, date } = dto;

    const object = await this.prisma.object.findUnique({
      where: { id: objectId },
      select: {
        workTimeFrom: true,
        workTimeTo: true,
      },
    });

    if (!object) {
      throw new NotFoundException('Objekt ne postoji');
    }

    const workTimeFrom = parseInt(object.workTimeFrom.split(':')[0], 10);
    const workTimeTo = parseInt(object.workTimeTo.split(':')[0], 10);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const existingReservations = await this.prisma.reservation.findMany({
      where: {
        objectId,
        date: targetDate,
        status: {
          in: ['PENDING', 'APPROVED'],
        },
      },
      select: {
        time: true,
      },
    });

    const reservedTimes = new Set(
      existingReservations.map((res) =>
        res.time.toISOString().substring(11, 16),
      ),
    );

    const availableTimes: string[] = [];
    for (let hour = workTimeFrom; hour < workTimeTo; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      if (!reservedTimes.has(time)) {
        availableTimes.push(time);
      }
    }

    return {
      entities: availableTimes,
    };
  }
}

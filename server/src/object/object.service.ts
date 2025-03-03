import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditObjectDto, ObjectDto } from './dto';

@Injectable()
export class ObjectService {
  constructor(private prisma: PrismaService) {}

  async getAllObjects() {
    try {
      const allObjects = await this.prisma.object.findMany({});

      return allObjects;
    } catch (error) {
      throw new HttpException(
        'Došlo je do pogreške pri dohvaćanju objekata.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createObject(dto: ObjectDto) {
    try {
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

      return 'Objekt uspješno kreiran';
    } catch (error) {
      console.error(error); // Debugging: Log the actual error
      throw new HttpException(
        'Došlo je do pogreške pri kreiranju objekta.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getObject(id: string) {
    const object = await this.prisma.object.findUnique({
      where: { id },
    });

    if (!object) throw new ForbiddenException('Objekt ne postoji');

    return object;
  }

  async editObject(id: string, dto: EditObjectDto) {
    const objectExist = await this.prisma.object.findUnique({
      where: { id },
    });

    if (!objectExist) throw new ForbiddenException('Objekt ne postoji');

    const updateData = Object.fromEntries(
      Object.entries(dto).filter(
        ([_, value]) => value !== undefined && value !== '',
      ),
    );

    if (dto.workTimeFrom && !dto.workTimeTo) {
      if (dto.workTimeFrom >= objectExist.workTimeTo) {
        throw new HttpException(
          'Vrijeme početka rada mora biti manje od vremena završetka rada.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (!dto.workTimeFrom && dto.workTimeTo) {
      if (dto.workTimeTo <= objectExist.workTimeFrom) {
        throw new HttpException(
          'Vrijeme završetka rada mora biti veće od vremena početka rada.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.prisma.object.update({
      where: { id },
      data: {
        ...updateData,
        unavailablePeriods: {
          create: updateData.unavailablePeriods.map((period) => ({
            startDate: new Date(period.startDate),
            endDate: new Date(period.endDate),
          })),
        },
      },
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Objekt je uređen',
    };
  }

  async deleteObject(id: string) {
    const objectExist = await this.prisma.object.findUnique({
      where: { id },
    });

    if (!objectExist) throw new ForbiddenException('Objekt ne postoji');

    await this.prisma.$transaction([
      this.prisma.unavailablePeriod.deleteMany({
        where: { objectId: id },
      }),
      this.prisma.object.delete({
        where: { id },
      }),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: 'Objekt uspješno izbrisan',
    };
  }
}

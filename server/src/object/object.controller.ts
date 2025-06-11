import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectService } from './object.service';
import {
  EditObjectDto,
  GetAvailableTimesDto,
  ObjectDto,
  ReservationDto,
} from './dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '@prisma/client';
import { GetCurrentUserId, Public } from '../common/decorators';

@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Public()
  @Get('/all')
  getAllObjectsName(
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.objectService.getAllObjectsName(size, page);
  }

  @Public()
  @Get()
  getAllObjects(
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
    @Query('search') search?: string,
    @Query('city') city?: string,
    @Query('type') type?: string,
    @Query('terrainType') terrainType?: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.objectService.getAllObjects(
      size,
      page,
      search,
      city,
      type,
      terrainType,
    );
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  createObject(@Body() dto: ObjectDto) {
    return this.objectService.createObject(dto);
  }

  @Public()
  @Get('/:id')
  getObject(@Param('id') id: string) {
    return this.objectService.getObject(id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  editObject(@Param('id') id: string, @Body() dto: EditObjectDto) {
    return this.objectService.editObject(id, dto);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  deleteObject(@Param('id') id: string) {
    return this.objectService.deleteObject(id);
  }

  @Get('/:id/reservation')
  @Roles(Role.USER, Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  getReservationsByObject(
    @Param('id') objectId: string,
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.objectService.getReservationsByObject(objectId, size, page);
  }

  @Post('/:id/reservation')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  createReservation(
    @GetCurrentUserId() userId: string,
    @Param('id') objectId: string,
    @Body() dto: ReservationDto,
  ) {
    return this.objectService.createReservation(userId, objectId, dto);
  }

  @Post('/available-times')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getAvailableTimes(@Body() dto: GetAvailableTimesDto) {
    return this.objectService.getAvailableTimes(dto);
  }
}

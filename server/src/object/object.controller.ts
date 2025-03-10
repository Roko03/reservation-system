import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ObjectService } from './object.service';
import { EditObjectDto, ObjectDto } from './dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Role } from '@prisma/client';
import { Public } from '../common/decorators';

@Controller('object')
export class ObjectController {
  constructor(private objectService: ObjectService) {}

  @Public()
  @Get()
  getAllObjects() {
    return this.objectService.getAllObjects();
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
}

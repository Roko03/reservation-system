import { Controller, Get, UseGuards } from '@nestjs/common';
import { InfoService } from './info.service';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  getInfo() {
    return this.infoService.getInfo();
  }
}

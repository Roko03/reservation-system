import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Public } from '../common/decorators';
import { ContactDto } from './dto/contact.dto';

@Controller('mail')
export class MailerController {
  constructor(private mailerService: MailerService) {}

  @Public()
  @Post()
  contactMe(@Body() dto: ContactDto) {
    return this.mailerService.contactMe(dto);
  }
}

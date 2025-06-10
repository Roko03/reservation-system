import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

  async contactMe(dto: ContactDto) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: this.config.get('GMAIL_USER'),
          pass: this.config.get('GMAIL_PASS'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        to: dto.email,
        subject: 'Imam pitanja',
        text: dto.text,
      });

      return {
        message: 'Mail je uspjesno poslan',
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendEmail(email: string, subject: string, text: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: this.config.get('GMAIL_USER'),
          pass: this.config.get('GMAIL_PASS'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      await transporter.sendMail({
        to: email,
        subject,
        text,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

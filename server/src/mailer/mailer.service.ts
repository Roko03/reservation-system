import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  constructor(private config: ConfigService) {}

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

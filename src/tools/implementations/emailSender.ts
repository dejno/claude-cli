// src/tools/implementations/emailSender.ts
import nodemailer from 'nodemailer';
import { env } from '../../config/env';
import logger from '../../utils/logger';
import { MailOptions } from 'nodemailer/lib/json-transport';

export class EmailSender {
  private static instance: EmailSender;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD
      }
    });
  }

  static getInstance(): EmailSender {
    if (!EmailSender.instance) {
      EmailSender.instance = new EmailSender();
    }
    return EmailSender.instance;
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      logger.info('SMTP connection verified successfully');
      return true;
    } catch (error: unknown) {
      logger.error('SMTP connection failed:', error);
      if (error instanceof Error) {
        throw new Error(`SMTP verification failed: ${error.message}`);
      }
      throw new Error('SMTP verification failed: Unknown error');
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    body: string,
    priority: 'low' | 'normal' | 'high' = 'normal'
  ): Promise<MailOptions> {
    try {
      await this.transporter.sendMail({
        from: env.GMAIL_USER,
        to,
        subject,
        text: body,
        priority
      });

      logger.info(`Email sent successfully to ${to}`);
      return {
        to,
        subject,
        text: body,
        priority
      };
    } catch (error: unknown) {
      logger.error('Failed to send email:', error);
      if (error instanceof Error) {
        throw new Error(`Email sending failed: ${error.message}`);
      }
      throw new Error('Email sending failed: Unknown error');
    }
  }
}
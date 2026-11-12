import { Injectable, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private readonly logger =
    new Logger(DatabaseService.name);

  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      ssl: {
        rejectUnauthorized: false,
      },

      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      const connection =
        await this.pool.getConnection();

      this.logger.log(
        'MySQL connected successfully.',
      );

      connection.release();
    } catch (error) {
      this.logger.error(
        'MySQL connection failed.',
      );

      console.error(error);
    }
  }

  getPool() {
    return this.pool;
  }
}
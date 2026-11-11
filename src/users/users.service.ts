
import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
  ) {}

  async getAll() {
    const pool = this.databaseService.getPool();

    const [rows] = await pool.query(
      'SELECT id, username, role FROM users',
    );

    return rows;
  }

  async findById(id: number) {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  async findByUsername(username: string) {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
    );

    return rows[0];
  }

  async findByRefreshToken(refreshToken: string) {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      'SELECT * FROM users WHERE refreshToken = ?',
      [refreshToken],
    );

    return rows[0];
  }

  async setRefreshToken(
    userId: number,
    refreshToken: string | null,
  ) {
    const pool = this.databaseService.getPool();

    await pool.query(
      'UPDATE users SET refreshToken = ? WHERE id = ?',
      [refreshToken, userId],
    );

    return true;
  }

  async createUser(userData: any) {
    const pool = this.databaseService.getPool();

    const existingUser = await this.findByUsername(
      userData.username,
    );

    if (existingUser) {
      throw new ConflictException(
        'Username already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      userData.password,
      10,
    );

    const [result]: any = await pool.query(
      `INSERT INTO users (username, password, role)
       VALUES (?, ?, ?)`,
      [
        userData.username,
        hashedPassword,
        'Customer',
      ],
    );

    return {
      message: 'User registered successfully',
      userId: result.insertId,
      username: userData.username,
      role: 'Customer',
    };
  }

  async updateUser(id: number, userData: any) {
    const pool = this.databaseService.getPool();

    await pool.query(
      `UPDATE users
       SET username = ?, role = ?
       WHERE id = ?`,
      [
        userData.username,
        userData.role,
        id,
      ],
    );

    return {
      message: 'User updated successfully',
    };
  }

  async deleteUser(id: number) {
    const pool = this.databaseService.getPool();

    await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id],
    );

    return {
      message: 'User deleted successfully',
    };
  }
}

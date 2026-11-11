
import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
  ) {}

  // GET ALL USERS
  async getAll() {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      `SELECT
        user_id AS id,
        username,
        role
       FROM users
       ORDER BY user_id DESC`,
    );

    return rows;
  }

  // FIND USER BY ID
  async findById(id: number) {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      `SELECT
        user_id AS id,
        username,
        password,
        role,
        refreshToken
       FROM users
       WHERE user_id = ?
       LIMIT 1`,
      [id],
    );

    return rows[0] || null;
  }

  // FIND USER BY USERNAME
  async findByUsername(username: string) {
    const pool = this.databaseService.getPool();

    const cleanUsername = username.trim();

    const [rows]: any = await pool.query(
      `SELECT
        user_id AS id,
        username,
        password,
        role,
        refreshToken
       FROM users
       WHERE username = ?
       LIMIT 1`,
      [cleanUsername],
    );

    return rows[0] || null;
  }

  // FIND USER BY REFRESH TOKEN
  async findByRefreshToken(refreshToken: string) {
    const pool = this.databaseService.getPool();

    const [rows]: any = await pool.query(
      `SELECT
        user_id AS id,
        username,
        password,
        role,
        refreshToken
       FROM users
       WHERE refreshToken = ?
       LIMIT 1`,
      [refreshToken],
    );

    return rows[0] || null;
  }

  // SAVE OR REMOVE REFRESH TOKEN
  async setRefreshToken(
    userId: number,
    refreshToken: string | null,
  ) {
    const pool = this.databaseService.getPool();

    await pool.query(
      `UPDATE users
       SET refreshToken = ?
       WHERE user_id = ?`,
      [refreshToken, userId],
    );

    return true;
  }

  // REGISTER USER
  async createUser(userData: {
    username: string;
    password: string;
  }) {
    const pool = this.databaseService.getPool();

    const username = userData.username?.trim();
    const password = userData.password;

    if (!username || !password) {
      throw new BadRequestException(
        'Username and password are required',
      );
    }

    if (password.length < 8) {
      throw new BadRequestException(
        'Password must be at least 8 characters',
      );
    }

    const existingUser = await this.findByUsername(username);

    if (existingUser) {
      throw new ConflictException(
        'Username already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10,
    );

    try {
      const [result]: any = await pool.query(
        `INSERT INTO users
          (username, password, role)
         VALUES (?, ?, ?)`,
        [username, hashedPassword, 'Passenger'],
      );

      return {
        message: 'User registered successfully',
        userId: result.insertId,
        username,
        role: 'Passenger',
      };
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          'Username already exists',
        );
      }

      throw error;
    }
  }

  // UPDATE USER
  async updateUser(
    id: number,
    userData: {
      username: string;
      role: 'Admin' | 'Passenger';
    },
  ) {
    const pool = this.databaseService.getPool();

    const username = userData.username?.trim();

    if (!username || !userData.role) {
      throw new BadRequestException(
        'Username and role are required',
      );
    }

    if (!['Admin', 'Passenger'].includes(userData.role)) {
      throw new BadRequestException('Invalid user role');
    }

    const existingUser = await this.findByUsername(username);

    if (
      existingUser &&
      Number(existingUser.id) !== Number(id)
    ) {
      throw new ConflictException(
        'Username already exists',
      );
    }

    await pool.query(
      `UPDATE users
       SET username = ?, role = ?
       WHERE user_id = ?`,
      [username, userData.role, id],
    );

    return {
      message: 'User updated successfully',
    };
  }

  // DELETE USER
  async deleteUser(id: number) {
    const pool = this.databaseService.getPool();

    await pool.query(
      'DELETE FROM users WHERE user_id = ?',
      [id],
    );

    return {
      message: 'User deleted successfully',
    };
  }
}

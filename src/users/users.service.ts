import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  private getPool() {
    return (this.databaseService as any).pool;
  }

  async findByUsername(username: string) {
    const [rows]: any = await this.getPool().query(
      `
      SELECT *
      FROM users
      WHERE username = ?
      LIMIT 1
      `,
      [username],
    );

    return rows.length ? rows[0] : null;
  }

  async setRefreshToken(
    userId: number,
    refreshToken: string | null,
  ) {
    await this.getPool().query(
      `
      UPDATE users
      SET refresh_token = ?
      WHERE id = ?
      `,
      [refreshToken, userId],
    );
  }

  async findByRefreshToken(refreshToken: string) {
    const [rows]: any = await this.getPool().query(
      `
      SELECT *
      FROM users
      WHERE refresh_token = ?
      LIMIT 1
      `,
      [refreshToken],
    );

    return rows.length ? rows[0] : null;
  }

  async getUsers() {
    const [rows]: any = await this.getPool().query(
      `
      SELECT
      id,
      username,
      role,
      created_at
      FROM users
      ORDER BY id DESC
      `,
    );

    return rows;
  }

  async createUser(body: any) {
    const hashedPassword = await bcrypt.hash(
      body.password,
      10,
    );

    await this.getPool().query(
      `
      INSERT INTO users
      (
        username,
        password,
        role
      )
      VALUES (?, ?, ?)
      `,
      [
        body.username,
        hashedPassword,
        body.role || 'Customer',
      ],
    );

    return {
      success: true,
      message: 'User created',
    };
  }

  async updateUser(id: number, body: any) {
    await this.getPool().query(
      `
      UPDATE users
      SET
        username=?,
        role=?
      WHERE id=?
      `,
      [
        body.username,
        body.role,
        id,
      ],
    );

    return {
      success: true,
      message: 'User updated',
    };
  }

  async deleteUser(id: number) {
    await this.getPool().query(
      `
      DELETE FROM users
      WHERE id=?
      `,
      [id],
    );

    return {
      success: true,
      message: 'User deleted',
    };
  }
}
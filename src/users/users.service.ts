import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string | null;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find(user => user.id === id);
  }

  findByUsername(username: string) {
    return this.users.find(
      user => user.username === username,
    );
  }

  findByRefreshToken(refreshToken: string) {
    return this.users.find(
      user => user.refreshToken === refreshToken,
    );
  }

  setRefreshToken(
    userId: number,
    refreshToken: string | null,
  ) {
    const user = this.users.find(
      user => user.id === userId,
    );

    if (!user) {
      return null;
    }

    user.refreshToken = refreshToken;

    return user;
  }

  createUser(userData: any) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };

    this.users.push(newUser);

    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  updateUser(id: number, userData: any) {
    const index = this.users.findIndex(
      user => user.id === id,
    );

    if (index === -1) {
      return { message: 'User not found' };
    }

    this.users[index] = {
      ...this.users[index],
      ...userData,
    };

    return {
      message: 'User updated successfully',
      data: this.users[index],
    };
  }

  deleteUser(id: number) {
    this.users = this.users.filter(
      user => user.id !== id,
    );

    return {
      message: 'User deleted successfully',
    };
  }
}
import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  getAll() {
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

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
      return {
        message: 'User not found',
      };
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
    this.users = this.users.filter(user => user.id !== id);

    return {
      message: 'User deleted successfully',
    };
  }
}
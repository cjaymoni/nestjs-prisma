import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      role: 'user',
    },
    {
      id: 3,
      name: 'Jim Doe',
      email: 'jim.doe@example.com',
      role: 'user',
    },
    {
      id: 4,
      name: 'Guest',
      email: 'guest@localhost.local',
      role: 'guest',
    },
    {
      id: 5,
      name: 'Loki Odinson',
      email: 'loki@localhost.com',
      role: 'admin',
    },
  ];

  findAllUsers(role?: string, limit?: number, offset?: number) {
    if (role) {
      const users = this.users.filter((user) => user.role === role);
      if (!users.length)
        throw new NotFoundException(`No user with role ${role} found`);
    } else if (limit && offset) {
      return this.users.slice(offset, offset + limit);
    }
    return this.users;
  }

  findOneUser(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  createUser(user: CreateUserDto) {
    const id = this.users[this.users.length - 1].id + 1;
    const newUser = { id, ...user };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, userUpdate: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    return this.findOneUser(id);
  }
  // const index = this.users.findIndex((user) => user.id === +id);
  // this.users[index] = { ...this.users[index], ...userUpdate };
  // return this.users[index];

  deleteUser(id: number) {
    const removedUser = this.findOneUser(id);
    this.users = this.users.filter((user) => user.id !== +id);
    return removedUser;
  }
}

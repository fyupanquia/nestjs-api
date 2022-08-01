import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
  public users: User[] = [];
  getUsers(): User[] {
    return this.users;
  }
  getUser(email: string): User {
    const user = this.users.filter((i) => i.email == email)[0];
    if (user && Array.isArray(user) && user.length > 0) return user[0];
    throw new NotFoundException('user not found');
  }
  addUser(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
  deleteUser(email: string): User[] {
    const remainingUser = this.users.filter((i) => i.email !== email);
    this.users = remainingUser;
    return remainingUser;
  }
}

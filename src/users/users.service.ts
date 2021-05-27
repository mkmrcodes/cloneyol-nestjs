import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUserById(id: string): Promise<User> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`User with ID:${id} not found`);
    }
    return found;
  }
  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.getUserByEmail(email);
    if (!found) {
      throw new NotFoundException(`User with Email:${email} not found`);
    }
    return found;
  }
  async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(getUsersFilterDto);
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }
  async deleteUser(id: string): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID:${id} not found`);
    }
    return id;
  }
  async updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    const updated = Object.assign(user, createUserDto);
    await updated.save();
    return updated;
  }
}

import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UserRepository } from '../repositories/userRepository';
import { User } from '../entities/User';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const userDto = plainToClass(CreateUserDto, userData);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error =>
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      throw new Error(`Dados inválidos: ${errorMessages}`);
    }

    const existingUser = await this.userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    return await this.userRepository.createUser(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const userDto = plainToClass(UpdateUserDto, userData);
    const errors = await validate(userDto);

    if (errors.length > 0) {
      const errorMessages = errors.map(error =>
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      throw new Error(`Dados inválidos: ${errorMessages}`);
    }

    if (userData.email) {
      const existingUser = await this.userRepository.getUserByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email já está em uso');
      }
    }

    const updatedUser = await this.userRepository.updateUser(id, userData);
    if (!updatedUser) {
      throw new Error('Usuário não encontrado');
    }
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw new Error('Usuário não encontrado');
    }
  }
}
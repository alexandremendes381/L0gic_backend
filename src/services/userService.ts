import { UserRepository } from '../repositories/userRepository';
import { User, CreateUserRequest, UpdateUserRequest } from '../types/user';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }

    const existingUser = await this.userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(userData.birthDate)) {
      throw new Error('Invalid birth date format. Use YYYY-MM-DD');
    }

    return await this.userRepository.createUser(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
      }

      const existingUser = await this.userRepository.getUserByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error('Email already exists');
      }
    }

    if (userData.birthDate) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(userData.birthDate)) {
        throw new Error('Invalid birth date format. Use YYYY-MM-DD');
      }
    }

    const updatedUser = await this.userRepository.updateUser(id, userData);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: number): Promise<void> {
    const deleted = await this.userRepository.deleteUser(id);
    if (!deleted) {
      throw new Error('User not found');
    }
  }
}
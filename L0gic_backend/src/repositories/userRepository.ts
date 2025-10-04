import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { CreateUserDto, UpdateUserDto } from '../dto/userDto';

export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async createUser(userData: CreateUserDto): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async updateUser(id: number, userData: UpdateUserDto): Promise<User | null> {
    const user = await this.getUserById(id);
    if (!user) {
      return null;
    }

    Object.assign(user, userData);
    return await this.repository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
    });
  }

  async searchUsersByEmailAndName(searchTerm: string): Promise<User[]> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.email LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orWhere('user.name LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orderBy('user.createdAt', 'DESC')
      .getMany();
  }
}
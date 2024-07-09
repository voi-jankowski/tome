import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Attribute } from 'src/entities/attribute.entity';
import { createDefaultCategoriesAndAttributes } from 'src/utils/defaults';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
  ) {}

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    await createDefaultCategoriesAndAttributes(
      newUser,
      this.categoriesRepository,
      this.attributesRepository,
    );
    return newUser;
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

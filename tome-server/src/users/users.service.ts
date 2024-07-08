import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Attribute, AttributeType } from 'src/entities/attribute.entity';

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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);
    await this.createDefaultCategoriesAndAttributes(newUser);
    return newUser;
  }

  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private async createDefaultCategoriesAndAttributes(
    user: User,
  ): Promise<void> {
    const defaultCategories = [
      { name: 'Characters', isDefault: true, user },
      { name: 'Places', isDefault: true, user },
      { name: 'Events', isDefault: true, user },
    ];

    const categories = [];
    for (const categoryData of defaultCategories) {
      const category = this.categoriesRepository.create(categoryData);
      categories.push(await this.categoriesRepository.save(category));
    }

    const defaultAttributes = {
      Characters: [
        {
          name: 'name',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[0],
        },
        {
          name: 'DOB',
          type: AttributeType.DATE,
          isDefault: true,
          user,
          category: categories[0],
        },
        {
          name: 'description',
          type: AttributeType.TEXT,
          isDefault: true,
          user,
          category: categories[0],
        },
        {
          name: 'home',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[0],
        },
      ],
      Places: [
        {
          name: 'name',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[1],
        },
        {
          name: 'location',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[1],
        },
        {
          name: 'description',
          type: AttributeType.TEXT,
          isDefault: true,
          user,
          category: categories[1],
        },
        {
          name: 'characters involved',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[1],
        },
      ],
      Events: [
        {
          name: 'name',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[2],
        },
        {
          name: 'location',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[2],
        },
        {
          name: 'time',
          type: AttributeType.DATETIME,
          isDefault: true,
          user,
          category: categories[2],
        },
        {
          name: 'description',
          type: AttributeType.TEXT,
          isDefault: true,
          user,
          category: categories[2],
        },
        {
          name: 'characters involved',
          type: AttributeType.STRING,
          isDefault: true,
          user,
          category: categories[2],
        },
      ],
    };

    for (const categoryAttributes of Object.values(defaultAttributes)) {
      for (const attributeData of categoryAttributes) {
        const attribute = this.attributesRepository.create(attributeData);
        await this.attributesRepository.save(attribute);
      }
    }
  }
}

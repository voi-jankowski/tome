import { Injectable, ConflictException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  findAllByProject(projectId: number): Promise<Category[]> {
    return this.categoriesRepository
      .createQueryBuilder('category')
      .leftJoin('category.projects', 'project')
      .where('project.id = :projectId', { projectId })
      .getMany();
  }

  findAllDefaultsByUser(userId: number): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: { isDefault: true, user: { id: userId } },
    });
  }

  findAllNonDefaultsByUser(userId: number): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: { isDefault: false, user: { id: userId } },
    });
  }

  findCategoryByName(
    userId: number,
    name: string,
  ): Promise<Category | undefined> {
    return this.categoriesRepository.findOne({
      where: { name, user: { id: userId } },
    });
  }

  findCategoryById(id: number): Promise<Category | undefined> {
    return this.categoriesRepository.findOne({
      where: { id },
    });
  }

  async create(category: Category): Promise<Category> {
    // Check for duplicate category
    const existingCategory = await this.findCategoryByName(
      category.user.id,
      category.name,
    );
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists.');
    }
    return this.categoriesRepository.save(category);
  }

  async update(id: number, category: Category): Promise<Category> {
    await this.categoriesRepository.update(id, category);
    return this.categoriesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}

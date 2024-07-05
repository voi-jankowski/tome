import { Injectable, ConflictException } from '@nestjs/common';
import { Attribute } from '../entities/attribute.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: Repository<Attribute>,
  ) {}

  findAllByCategory(categoryId: number): Promise<Attribute[]> {
    return this.attributesRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  findAllDefaultsByUser(userId: number): Promise<Attribute[]> {
    return this.attributesRepository.find({
      where: { isDefault: true, user: { id: userId } },
    });
  }

  findAllNonDefaultsByUser(userId: number): Promise<Attribute[]> {
    return this.attributesRepository.find({
      where: { isDefault: false, user: { id: userId } },
    });
  }

  findAttributeByName(
    userId: number,
    name: string,
  ): Promise<Attribute | undefined> {
    return this.attributesRepository.findOne({
      where: { name, user: { id: userId } },
    });
  }

  findAttributeById(id: number): Promise<Attribute | undefined> {
    return this.attributesRepository.findOne({
      where: { id },
    });
  }

  async create(attribute: Attribute): Promise<Attribute> {
    // Check for duplicate attribute
    const existingAttribute = await this.findAttributeByName(
      attribute.user.id,
      attribute.name,
    );
    if (existingAttribute) {
      throw new ConflictException('Attribute with this name already exists.');
    }
    return this.attributesRepository.save(attribute);
  }

  async update(id: number, attribute: Attribute): Promise<Attribute> {
    await this.attributesRepository.update(id, attribute);
    return this.attributesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.attributesRepository.delete(id);
  }
}

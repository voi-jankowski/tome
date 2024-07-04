import { Injectable } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find({
      relations: ['category', 'itemAttributes', 'itemAttributes.attribute'],
    });
  }

  findOne(id: number): Promise<Item> {
    return this.itemsRepository.findOne({
      where: { id },
      relations: ['category', 'itemAttributes', 'itemAttributes.attribute'],
    });
  }

  async create(item: Item): Promise<Item> {
    return this.itemsRepository.save(item);
  }

  async update(id: number, item: Item): Promise<Item> {
    await this.itemsRepository.update(id, item);
    return this.itemsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.itemsRepository.delete(id);
  }

  async search(query: any): Promise<Item[]> {
    const qb = this.itemsRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.itemAttributes', 'itemAttribute')
      .leftJoinAndSelect('itemAttribute.attribute', 'attribute');

    if (query.category) {
      qb.andWhere('category.name = :category', { category: query.category });
    }

    if (query.attributes) {
      query.attributes.forEach((attr, index) => {
        qb.andWhere(
          `attribute.name = :attrName${index} AND itemAttribute.stringValue = :attrValue${index}`,
          {
            [`attrName${index}`]: attr.name,
            [`attrValue${index}`]: attr.value,
          },
        );
      });
    }

    return qb.getMany();
  }
}

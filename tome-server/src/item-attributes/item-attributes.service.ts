import { Injectable } from '@nestjs/common';
import { ItemAttribute } from './../entities/item-attribute.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemAttributesService {
  constructor(
    @InjectRepository(ItemAttribute)
    private itemAttributesRepository: Repository<ItemAttribute>,
  ) {}

  findAllByItem(itemId: number): Promise<ItemAttribute[]> {
    return this.itemAttributesRepository.find({
      where: { item: { id: itemId } },
      relations: ['item', 'attribute'],
    });
  }

  async searchAllItemsByValue(value: string): Promise<ItemAttribute[]> {
    return this.itemAttributesRepository
      .createQueryBuilder('itemAttribute')
      .leftJoinAndSelect('itemAttribute.item', 'item')
      .leftJoinAndSelect('itemAttribute.attribute', 'attribute')
      .where('itemAttribute.stringValue LIKE :value', { value: `%${value}%` })
      .orWhere('itemAttribute.numberValue = :number', { number: +value })
      .orWhere('itemAttribute.booleanValue = :boolean', {
        boolean: value === 'true',
      })
      .orWhere('itemAttribute.dateValue = :date', { date: new Date(value) })
      .getMany();
  }

  findOneById(id: number): Promise<ItemAttribute | undefined> {
    return this.itemAttributesRepository.findOne({
      where: { id },
      relations: ['item', 'attribute'],
    });
  }

  async create(itemAttribute: ItemAttribute): Promise<ItemAttribute> {
    return this.itemAttributesRepository.save(itemAttribute);
  }

  async update(
    id: number,
    itemAttribute: ItemAttribute,
  ): Promise<ItemAttribute> {
    await this.itemAttributesRepository.update(id, itemAttribute);
    return this.itemAttributesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.itemAttributesRepository.delete(id);
  }
}

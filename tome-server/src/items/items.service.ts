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
    return this.itemsRepository.find();
  }

  findOne(id: number): Promise<Item> {
    return this.itemsRepository.findOneBy({ id });
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
}

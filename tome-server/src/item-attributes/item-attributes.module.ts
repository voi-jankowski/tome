import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemAttributesService } from './item-attributes.service';
import { ItemAttributesController } from './item-attributes.controller';
import { ItemAttribute } from './../entities/item-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemAttribute])],
  providers: [ItemAttributesService],
  controllers: [ItemAttributesController],
})
export class ItemAttributesModule {}

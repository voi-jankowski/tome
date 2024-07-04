import { Module } from '@nestjs/common';
import { ItemAttributesService } from './item-attributes.service';
import { ItemAttributesController } from './item-attributes.controller';

@Module({
  providers: [ItemAttributesService],
  controllers: [ItemAttributesController]
})
export class ItemAttributesModule {}

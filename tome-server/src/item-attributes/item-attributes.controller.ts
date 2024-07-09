import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemAttributesService } from './item-attributes.service';
import { ItemAttribute } from './../entities/item-attribute.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('item-attributes')
@UseGuards(JwtAuthGuard)
export class ItemAttributesController {
  constructor(private readonly itemAttributesService: ItemAttributesService) {}

  @Get('item/:itemId')
  findAllByItem(@Param('itemId') itemId: number) {
    return this.itemAttributesService.findAllByItem(itemId);
  }

  @Get('search')
  searchAllItemsByValue(@Query('value') value: string) {
    return this.itemAttributesService.searchAllItemsByValue(value);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.itemAttributesService.findOneById(+id);
  }

  @Post()
  create(@Body() itemAttribute: ItemAttribute) {
    return this.itemAttributesService.create(itemAttribute);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() itemAttribute: ItemAttribute) {
    return this.itemAttributesService.update(+id, itemAttribute);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemAttributesService.remove(+id);
  }
}

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
import { ItemsService } from './items.service';
import { Item } from './../entities/item.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('items')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id);
  }

  @Post()
  create(@Body() item: Item) {
    return this.itemsService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: Item) {
    return this.itemsService.update(+id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  @Get('search')
  search(@Query() query: any) {
    return this.itemsService.search(query);
  }
}

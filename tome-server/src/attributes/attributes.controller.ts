import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { Attribute } from './../entities/attribute.entity';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get('category/:categoryId')
  findAllByCategory(@Param('categoryId') categoryId: number) {
    return this.attributesService.findAllByCategory(categoryId);
  }

  @Get('defaults')
  findAllDefaultsByUser(@Request() req) {
    return this.attributesService.findAllDefaultsByUser(req.user.id);
  }

  @Get('non-defaults')
  findAllNonDefaultsByUser(@Request() req) {
    return this.attributesService.findAllNonDefaultsByUser(req.user.id);
  }

  @Get('search-by-name')
  findAttributeByName(@Request() req, @Query('name') name: string) {
    return this.attributesService.findAttributeByName(req.user.id, name);
  }

  @Get(':id')
  findAttributeById(@Param('id') id: string) {
    return this.attributesService.findAttributeById(+id);
  }

  @Post()
  create(@Request() req, @Body() attribute: Attribute) {
    attribute.user = req.user;
    return this.attributesService.create(attribute);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() attribute: Attribute) {
    return this.attributesService.update(+id, attribute);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributesService.remove(+id);
  }
}

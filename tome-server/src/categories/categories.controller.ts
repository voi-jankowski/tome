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
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: number) {
    return this.categoriesService.findAllByProject(projectId);
  }

  @Get('defaults')
  findAllDefaultsByUser(@Request() req) {
    return this.categoriesService.findAllDefaultsByUser(req.user.id);
  }

  @Get('non-defaults')
  findAllNonDefaultsByUser(@Request() req) {
    return this.categoriesService.findAllNonDefaultsByUser(req.user.id);
  }

  @Get('search-by-name')
  findCategoryByName(@Request() req, @Query('name') name: string) {
    return this.categoriesService.findCategoryByName(req.user.id, name);
  }

  @Get(':id')
  findCategoryById(@Param('id') id: string) {
    return this.categoriesService.findCategoryById(+id);
  }

  @Post()
  create(@Request() req, @Body() category: Category) {
    category.user = req.user;
    return this.categoriesService.create(category);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() category: Category) {
    return this.categoriesService.update(+id, category);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}

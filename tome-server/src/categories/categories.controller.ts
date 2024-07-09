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
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from '../entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('project/:projectId')
  findAllByProject(@Param('projectId') projectId: number) {
    return this.categoriesService.findAllByProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('defaults')
  findAllDefaultsByUser(@Request() req) {
    return this.categoriesService.findAllDefaultsByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('non-defaults')
  findAllNonDefaultsByUser(@Request() req) {
    return this.categoriesService.findAllNonDefaultsByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-by-name')
  findCategoryByName(@Request() req, @Query('name') name: string) {
    return this.categoriesService.findCategoryByName(req.user.id, name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findCategoryById(@Param('id') id: string) {
    return this.categoriesService.findCategoryById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() category: Category) {
    category.user = req.user;
    return this.categoriesService.create(category);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() category: Category) {
    return this.categoriesService.update(+id, category);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}

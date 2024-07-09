import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './../entities/project.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(@Request() req) {
    return this.projectsService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.projectsService.findOneByUser(req.user.id, +id);
  }

  @Post()
  create(@Request() req, @Body() project: Project) {
    project.user = req.user;
    return this.projectsService.create(project);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() project: Project) {
    return this.projectsService.update(+id, project);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}

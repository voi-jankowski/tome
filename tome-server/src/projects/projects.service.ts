import { Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAllByUser(userId: number): Promise<Project[]> {
    return this.projectsRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOneByUser(userId: number, id: number): Promise<Project> {
    return this.projectsRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async create(project: Project): Promise<Project> {
    return this.projectsRepository.save(project);
  }

  async update(id: number, project: Project): Promise<Project> {
    await this.projectsRepository.update(id, project);
    return this.projectsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}

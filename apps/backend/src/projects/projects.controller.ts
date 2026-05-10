import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import type { CreateProjectDto, Project } from '@portfolio/types';
import { AdminTokenGuard } from '../common/guards/admin-token.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @UseGuards(AdminTokenGuard)
  create(@Body() body: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(body);
  }
}

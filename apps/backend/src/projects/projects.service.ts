import { Injectable } from '@nestjs/common';
import type { CreateProjectDto, Project } from '@portfolio/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const rows = await this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((row) => this.mapRow(row));
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const row = await this.prisma.project.create({
      data: {
        title: dto.title,
        description: dto.description,
        techStack: dto.techStack,
        githubUrl: dto.githubUrl,
        liveUrl: dto.liveUrl ?? null,
        architectureNotes: dto.architectureNotes,
        category: dto.category,
      },
    });
    return this.mapRow(row);
  }

  private mapRow(row: {
    id: string;
    title: string;
    description: string;
    techStack: unknown;
    githubUrl: string;
    liveUrl: string | null;
    architectureNotes: string;
    category: string;
    createdAt: Date;
  }): Project {
    return {
      ...row,
      techStack: row.techStack as string[],
      liveUrl: row.liveUrl ?? undefined,
    };
  }
}

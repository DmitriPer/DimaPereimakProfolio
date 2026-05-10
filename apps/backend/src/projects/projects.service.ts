import { Injectable } from '@nestjs/common';
import type { Project } from '@portfolio/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    const rows = await this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return rows.map(row => ({
      ...row,
      techStack: row.techStack as string[],
      liveUrl: row.liveUrl ?? undefined,
    }));
  }
}

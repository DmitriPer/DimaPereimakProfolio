import type { Project, CreateProjectDto, ContactSubmissionDto } from '@portfolio/types';

describe('@portfolio/types resolution in backend', () => {
  it('Project interface resolves with required fields', () => {
    const p: Project = {
      id: '1',
      title: 'Test',
      description: 'Desc',
      techStack: ['NestJS'],
      githubUrl: 'https://github.com/test',
      architectureNotes: 'Notes',
      category: 'Built from scratch',
      createdAt: new Date(),
    };
    expect(p.id).toBe('1');
    expect(p.liveUrl).toBeUndefined();
  });

  it('CreateProjectDto resolves', () => {
    const dto: CreateProjectDto = {
      title: 'Test',
      description: 'Desc',
      techStack: ['NestJS'],
      githubUrl: 'https://github.com/test',
      architectureNotes: 'Notes',
      category: 'Built from scratch',
    };
    expect(dto.title).toBe('Test');
  });

  it('ContactSubmissionDto resolves', () => {
    const dto: ContactSubmissionDto = {
      name: 'Dima',
      email: 'dima@example.com',
      message: 'Hello',
    };
    expect(dto.name).toBe('Dima');
  });
});

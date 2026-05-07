import type { Project, CreateProjectDto, ContactSubmissionDto } from './index';

// Type-level tests: these fail at compile time if interfaces are wrong
const _project: Project = {
  id: 'test-id',
  title: 'Test Project',
  description: 'A test project',
  techStack: ['TypeScript', 'Node.js'],
  githubUrl: 'https://github.com/test',
  architectureNotes: 'Some notes',
  category: 'Built from scratch',
  createdAt: new Date(),
};

const _projectWithLiveUrl: Project = {
  ..._project,
  liveUrl: 'https://example.com',
};

const _createDto: CreateProjectDto = {
  title: 'New Project',
  description: 'Description',
  techStack: ['React'],
  githubUrl: 'https://github.com/new',
  architectureNotes: 'Notes',
  category: 'Framework-based',
};

const _contactDto: ContactSubmissionDto = {
  name: 'Dima',
  email: 'dima@example.com',
  message: 'Hello!',
};

// Runtime test suite
describe('@portfolio/types', () => {
  it('Project interface — required fields present', () => {
    expect(_project.id).toBe('test-id');
    expect(_project.title).toBe('Test Project');
    expect(_project.techStack).toEqual(['TypeScript', 'Node.js']);
    expect(_project.liveUrl).toBeUndefined();
  });

  it('Project interface — optional liveUrl accepted', () => {
    expect(_projectWithLiveUrl.liveUrl).toBe('https://example.com');
  });

  it('CreateProjectDto — required fields present', () => {
    expect(_createDto.title).toBe('New Project');
    expect(_createDto.liveUrl).toBeUndefined();
  });

  it('ContactSubmissionDto — all three fields present', () => {
    expect(_contactDto.name).toBe('Dima');
    expect(_contactDto.email).toBe('dima@example.com');
    expect(_contactDto.message).toBe('Hello!');
  });
});

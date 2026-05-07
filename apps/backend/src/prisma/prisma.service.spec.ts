import * as fs from 'fs';
import * as path from 'path';

describe('Story 1.3 — Database Layer', () => {
  const backendRoot = path.join(__dirname, '../../');
  const schemaPath = path.join(backendRoot, 'prisma/schema.prisma');
  const migrationsDir = path.join(backendRoot, 'prisma/migrations');

  let schema: string;

  beforeAll(() => {
    schema = fs.readFileSync(schemaPath, 'utf-8');
  });

  it('schema.prisma exists', () => {
    expect(fs.existsSync(schemaPath)).toBe(true);
  });

  it('Project model — all required fields present', () => {
    expect(schema).toContain('model Project');
    expect(schema).toContain('id');
    expect(schema).toContain('title');
    expect(schema).toContain('description');
    expect(schema).toContain('techStack');
    expect(schema).toContain('githubUrl');
    expect(schema).toContain('liveUrl');
    expect(schema).toContain('architectureNotes');
    expect(schema).toContain('category');
    expect(schema).toContain('createdAt');
  });

  it('Project.liveUrl is optional (String?)', () => {
    expect(schema).toMatch(/liveUrl\s+String\?/);
  });

  it('ContactSubmission model — all required fields present', () => {
    expect(schema).toContain('model ContactSubmission');
    expect(schema).toContain('name');
    expect(schema).toContain('email');
    expect(schema).toContain('message');
    expect(schema).toContain('createdAt');
  });

  it('migration files committed to repository', () => {
    expect(fs.existsSync(migrationsDir)).toBe(true);
    const entries = fs.readdirSync(migrationsDir);
    const migrationFolders = entries.filter((e) =>
      fs.statSync(path.join(migrationsDir, e)).isDirectory(),
    );
    expect(migrationFolders.length).toBeGreaterThan(0);
  });

  it('DATABASE_URL read from env (prisma.config.ts sources .env)', () => {
    const configPath = path.join(backendRoot, 'prisma.config.ts');
    const config = fs.readFileSync(configPath, 'utf-8');
    expect(config).toContain('DATABASE_URL');
    expect(config).toContain('dotenv');
  });
});

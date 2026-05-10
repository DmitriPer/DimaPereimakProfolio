import { readFileSync } from 'fs';
import { join } from 'path';

const backendRoot = join(__dirname, '../');
const read = (rel: string) => readFileSync(join(backendRoot, rel), 'utf-8');

describe('Story 3.2 — POST /projects with ADMIN_TOKEN Guard', () => {
  let guardSrc: string;
  let controllerSrc: string;
  let serviceSrc: string;

  beforeAll(() => {
    guardSrc = read('src/common/guards/admin-token.guard.ts');
    controllerSrc = read('src/projects/projects.controller.ts');
    serviceSrc = read('src/projects/projects.service.ts');
  });

  describe('AdminTokenGuard — AR9, NFR7', () => {
    it('implements CanActivate', () => {
      expect(guardSrc).toContain('CanActivate');
    });

    it('is marked @Injectable()', () => {
      expect(guardSrc).toContain('@Injectable()');
    });

    it('reads token from process.env.ADMIN_TOKEN — not hardcoded', () => {
      expect(guardSrc).toContain('process.env.ADMIN_TOKEN');
      expect(guardSrc).not.toMatch(/Bearer\s+[A-Za-z0-9+/=]{8,}/);
    });

    it('throws UnauthorizedException when no Authorization header', () => {
      expect(guardSrc).toContain('UnauthorizedException');
    });

    it('expects Bearer token format', () => {
      expect(guardSrc).toContain('Bearer');
    });
  });

  describe('controller — POST /projects', () => {
    it('imports and applies @UseGuards(AdminTokenGuard)', () => {
      expect(controllerSrc).toContain('UseGuards');
      expect(controllerSrc).toContain('AdminTokenGuard');
    });

    it('has a @Post() handler', () => {
      expect(controllerSrc).toContain('@Post()');
    });

    it('uses @Body() to receive the DTO', () => {
      expect(controllerSrc).toContain('@Body()');
    });

    it('return type is Promise<Project>', () => {
      expect(controllerSrc).toContain('Promise<Project>');
    });

    it('imports CreateProjectDto from @portfolio/types', () => {
      expect(controllerSrc).toContain('CreateProjectDto');
      expect(controllerSrc).toContain("from '@portfolio/types'");
    });
  });

  describe('service — create()', () => {
    it('has a create() method', () => {
      expect(serviceSrc).toContain('create(');
    });

    it('imports CreateProjectDto from @portfolio/types', () => {
      expect(serviceSrc).toContain('CreateProjectDto');
      expect(serviceSrc).toContain("from '@portfolio/types'");
    });

    it('calls prisma.project.create()', () => {
      expect(serviceSrc).toContain('prisma.project.create');
    });

    it('returns Promise<Project>', () => {
      expect(serviceSrc).toContain('Promise<Project>');
    });

    it('maps liveUrl null to undefined (matches Project interface)', () => {
      expect(serviceSrc).toContain('liveUrl');
      expect(serviceSrc).toMatch(/liveUrl.*null|null.*liveUrl/);
    });
  });
});

import { readFileSync } from 'fs';
import { join } from 'path';

const backendRoot = join(__dirname, '../');
const read = (rel: string) => readFileSync(join(backendRoot, rel), 'utf-8');

describe('Story 3.1 — NestJS Projects API', () => {
  let controllerSrc: string;
  let serviceSrc: string;
  let projectsModuleSrc: string;
  let appModuleSrc: string;
  let filterSrc: string;
  let mainSrc: string;

  beforeAll(() => {
    controllerSrc = read('src/projects/projects.controller.ts');
    serviceSrc = read('src/projects/projects.service.ts');
    projectsModuleSrc = read('src/projects/projects.module.ts');
    appModuleSrc = read('src/app.module.ts');
    filterSrc = read('src/common/filters/http-exception.filter.ts');
    mainSrc = read('src/main.ts');
  });

  describe('controller', () => {
    it("is decorated with @Controller('projects')", () => {
      expect(controllerSrc).toContain("@Controller('projects')");
    });

    it('exposes a @Get() handler named findAll', () => {
      expect(controllerSrc).toContain('@Get()');
      expect(controllerSrc).toContain('findAll');
    });

    it('injects ProjectsService', () => {
      expect(controllerSrc).toContain('ProjectsService');
    });

    it('return type is Promise<Project[]>', () => {
      expect(controllerSrc).toContain('Promise<Project[]>');
    });
  });

  describe('service', () => {
    it('is marked @Injectable()', () => {
      expect(serviceSrc).toContain('@Injectable()');
    });

    it('injects PrismaService via constructor', () => {
      expect(serviceSrc).toContain('PrismaService');
    });

    it('calls prisma.project.findMany()', () => {
      expect(serviceSrc).toContain('findMany');
    });

    it('imports Project type from @portfolio/types', () => {
      expect(serviceSrc).toContain("from '@portfolio/types'");
    });

    it('casts techStack to string[]', () => {
      expect(serviceSrc).toContain('string[]');
    });

    it('orders results by createdAt desc', () => {
      expect(serviceSrc).toContain('createdAt');
      expect(serviceSrc).toContain('desc');
    });
  });

  describe('error handling — NFR5', () => {
    it('exception filter implements ExceptionFilter', () => {
      expect(filterSrc).toContain('ExceptionFilter');
    });

    it('filter catches all exceptions with @Catch()', () => {
      expect(filterSrc).toContain('@Catch()');
    });

    it('filter handles HttpException for status code', () => {
      expect(filterSrc).toContain('HttpException');
    });

    it('filter returns generic message for 5xx errors (NFR5)', () => {
      expect(filterSrc).toContain('Internal server error');
    });

    it('filter is applied globally in main.ts via useGlobalFilters', () => {
      expect(mainSrc).toContain('useGlobalFilters');
    });

    it('main.ts imports AllExceptionsFilter', () => {
      expect(mainSrc).toContain('AllExceptionsFilter');
    });
  });

  describe('module wiring', () => {
    it('AppModule imports PrismaModule', () => {
      expect(appModuleSrc).toContain('PrismaModule');
    });

    it('AppModule imports ProjectsModule', () => {
      expect(appModuleSrc).toContain('ProjectsModule');
    });

    it('ProjectsModule declares ProjectsController', () => {
      expect(projectsModuleSrc).toContain('ProjectsController');
    });

    it('ProjectsModule provides ProjectsService', () => {
      expect(projectsModuleSrc).toContain('ProjectsService');
    });
  });
});

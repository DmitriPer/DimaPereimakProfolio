export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureNotes: string;
  category: string;
  createdAt: Date;
}

export interface CreateProjectDto {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  architectureNotes: string;
  category: string;
}

export interface ContactSubmissionDto {
  name: string;
  email: string;
  message: string;
}

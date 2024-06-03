// Модель для вакансии
export interface JobVacancy {
  jobId: number;
  employerId: number;
  jobTitle: string;
  jobDescription: string;
  jobRequirements: string[];
  salaryRange: string;
  location: string;
  postDate: string;
  isActive: boolean;
  completedByJobSeekerId?: number;
}

// Модель для выполненной работы
export interface CompletedJob {
  jobId: number;
  employerId: number;
  jobSeekerId: number;
  jobTitle: string;
  completionDate: string;
  review?: string;
}

// Базовая модель для пользователя
export interface User {
  userId: number;
  email: string;
  phoneNo: string;
  country: string;
  city: string;
  about: string;
  userType: 'Employer' | 'JobSeeker';
  age: number;
  rating: number;
  socialLinks?: SocialLink[];
}

// Модель для работодателя (физическое лицо)
export interface Employer extends User {
  fullName: string;
  logoURL?: string;
}

// Модель для специалиста
export interface JobSeeker extends User {
  fullName: string;
  experienceStatus: string;
  resumeURL: string;
  jobSeekerSkills: Skill[];
  jobSeekerWorkExperiences: WorkExperience[];
  portfolioURL?: string;
  expectedSalary?: string;
  availability?: string;
  education?: Education[];
}

export interface Skill {
  skillId: number;
  skillName: string;
  durationOfSkill: string;
}

export interface WorkExperience {
  workExpId: number;
  companyName: string;
  isCurrentCompany: boolean;
  profile: string;
  startDate: string;
  endDate: string;
  jobDescription: string;
}

export interface Education {
  educationId: number;
  institutionName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface SocialLink {
  platformName: string;
  url: string;
}

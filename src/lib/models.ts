
// CV Data Models

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  profilePhoto?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentPosition: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentlyStudying: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
}

export interface CVTemplate {
  id: string;
  name: string;
  previewImage: string;
  component: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  template: string;
  createdAt: string;
  updatedAt: string;
}

export const DEFAULT_CV_DATA: CVData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  template: "modern",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Admin Models
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

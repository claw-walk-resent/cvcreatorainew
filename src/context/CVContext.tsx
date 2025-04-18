
import { createContext, useState, useContext, ReactNode } from "react";
import { CVData, DEFAULT_CV_DATA, ExperienceItem, EducationItem, SkillItem, ProjectItem } from "@/lib/models";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { enhanceTextWithAI } from "@/lib/api";

interface CVContextProps {
  cvData: CVData;
  updatePersonalInfo: (info: Partial<CVData["personalInfo"]>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  enhanceText: (text: string, role: string, context: string) => Promise<string>;
  setTemplate: (templateId: string) => void;
  resetCV: () => void;
  loadSampleData: () => void;
}

export const CVContext = createContext<CVContextProps | undefined>(undefined);

export const useCVContext = () => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error("useCVContext must be used within a CVProvider");
  }
  return context;
};

interface CVProviderProps {
  children: ReactNode;
}

export const CVProvider = ({ children }: CVProviderProps) => {
  const [cvData, setCVData] = useState<CVData>(() => {
    // Try to get from localStorage
    const savedData = localStorage.getItem("cv-data");
    return savedData ? JSON.parse(savedData) : { ...DEFAULT_CV_DATA };
  });

  // Save to localStorage whenever CV data changes
  const updateCVData = (newData: CVData) => {
    setCVData(newData);
    localStorage.setItem("cv-data", JSON.stringify(newData));
  };

  const updatePersonalInfo = (info: Partial<CVData["personalInfo"]>) => {
    updateCVData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        ...info
      },
      updatedAt: new Date().toISOString()
    });
  };

  // Experience methods
  const addExperience = () => {
    const newExperience: ExperienceItem = {
      id: uuidv4(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentPosition: false,
      description: ""
    };
    
    updateCVData({
      ...cvData,
      experiences: [newExperience, ...cvData.experiences],
      updatedAt: new Date().toISOString()
    });
  };

  const updateExperience = (id: string, data: Partial<ExperienceItem>) => {
    updateCVData({
      ...cvData,
      experiences: cvData.experiences.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      ),
      updatedAt: new Date().toISOString()
    });
  };

  const removeExperience = (id: string) => {
    updateCVData({
      ...cvData,
      experiences: cvData.experiences.filter(exp => exp.id !== id),
      updatedAt: new Date().toISOString()
    });
    toast({
      title: "Experience removed",
      description: "The experience has been removed from your CV"
    });
  };

  // Education methods
  const addEducation = () => {
    const newEducation: EducationItem = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrentlyStudying: false,
      description: ""
    };
    
    updateCVData({
      ...cvData,
      education: [newEducation, ...cvData.education],
      updatedAt: new Date().toISOString()
    });
  };

  const updateEducation = (id: string, data: Partial<EducationItem>) => {
    updateCVData({
      ...cvData,
      education: cvData.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      ),
      updatedAt: new Date().toISOString()
    });
  };

  const removeEducation = (id: string) => {
    updateCVData({
      ...cvData,
      education: cvData.education.filter(edu => edu.id !== id),
      updatedAt: new Date().toISOString()
    });
    toast({
      title: "Education removed",
      description: "The education has been removed from your CV"
    });
  };

  // Skills methods
  const addSkill = () => {
    const newSkill: SkillItem = {
      id: uuidv4(),
      name: "",
      level: 3
    };
    
    updateCVData({
      ...cvData,
      skills: [...cvData.skills, newSkill],
      updatedAt: new Date().toISOString()
    });
  };

  const updateSkill = (id: string, data: Partial<SkillItem>) => {
    updateCVData({
      ...cvData,
      skills: cvData.skills.map(skill => 
        skill.id === id ? { ...skill, ...data } : skill
      ),
      updatedAt: new Date().toISOString()
    });
  };

  const removeSkill = (id: string) => {
    updateCVData({
      ...cvData,
      skills: cvData.skills.filter(skill => skill.id !== id),
      updatedAt: new Date().toISOString()
    });
    toast({
      title: "Skill removed",
      description: "The skill has been removed from your CV"
    });
  };

  // Projects methods
  const addProject = () => {
    const newProject: ProjectItem = {
      id: uuidv4(),
      name: "",
      description: "",
      url: "",
      startDate: "",
      endDate: "",
      isOngoing: false
    };
    
    updateCVData({
      ...cvData,
      projects: [newProject, ...cvData.projects],
      updatedAt: new Date().toISOString()
    });
  };

  const updateProject = (id: string, data: Partial<ProjectItem>) => {
    updateCVData({
      ...cvData,
      projects: cvData.projects.map(proj => 
        proj.id === id ? { ...proj, ...data } : proj
      ),
      updatedAt: new Date().toISOString()
    });
  };

  const removeProject = (id: string) => {
    updateCVData({
      ...cvData,
      projects: cvData.projects.filter(proj => proj.id !== id),
      updatedAt: new Date().toISOString()
    });
    toast({
      title: "Project removed",
      description: "The project has been removed from your CV"
    });
  };

  // AI text enhancement
  const enhanceText = async (text: string, role: string = "", context: string = ""): Promise<string> => {
    try {
      toast({
        title: "Enhancing text",
        description: "AI is working on improving your text..."
      });
      
      const response = await enhanceTextWithAI(text, role, context);
      
      if (response.success) {
        toast({
          title: "Enhancement complete",
          description: "Your text has been professionally enhanced"
        });
        return response.enhancedText;
      } else {
        toast({
          title: "Enhancement failed",
          description: response.message || "Failed to enhance text. Please try again.",
          variant: "destructive"
        });
        return text;
      }
    } catch (error) {
      console.error("Error enhancing text:", error);
      toast({
        title: "Enhancement error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
      return text;
    }
  };

  // Template selection
  const setTemplate = (templateId: string) => {
    updateCVData({
      ...cvData,
      template: templateId,
      updatedAt: new Date().toISOString()
    });
    toast({
      title: "Template updated",
      description: `CV template changed to ${templateId}`
    });
  };

  // Reset CV data
  const resetCV = () => {
    updateCVData({ ...DEFAULT_CV_DATA });
    toast({
      title: "CV reset",
      description: "Your CV has been reset to default"
    });
  };

  // Load sample data for demonstration
  const loadSampleData = () => {
    const sampleData: CVData = {
      personalInfo: {
        firstName: "Alex",
        lastName: "Johnson",
        title: "Senior Software Engineer",
        email: "alex.johnson@example.com",
        phone: "(555) 123-4567",
        location: "San Francisco, CA",
        website: "alexjohnson.dev",
        summary: "Passionate software engineer with 8+ years of experience developing scalable applications and leading engineering teams. Expertise in JavaScript, React, Node.js, and cloud technologies."
      },
      experiences: [
        {
          id: uuidv4(),
          company: "Tech Innovations Inc.",
          position: "Senior Software Engineer",
          location: "San Francisco, CA",
          startDate: "2020-01",
          endDate: "",
          isCurrentPosition: true,
          description: "• Lead a team of 6 engineers developing a cloud-native SaaS platform\n• Architected and implemented microservices using Node.js and TypeScript\n• Reduced API response time by 40% through performance optimization\n• Mentored junior developers and conducted code reviews"
        },
        {
          id: uuidv4(),
          company: "WebSolutions Co.",
          position: "Frontend Developer",
          location: "San Jose, CA",
          startDate: "2018-03",
          endDate: "2019-12",
          isCurrentPosition: false,
          description: "• Developed responsive web applications using React and Redux\n• Implemented component libraries improving development efficiency by 30%\n• Collaborated with UX designers to implement pixel-perfect interfaces\n• Maintained 95% test coverage across all frontend codebase"
        }
      ],
      education: [
        {
          id: uuidv4(),
          institution: "University of California, Berkeley",
          degree: "Master's Degree",
          field: "Computer Science",
          location: "Berkeley, CA",
          startDate: "2016-08",
          endDate: "2018-05",
          isCurrentlyStudying: false,
          description: "• Specialization in Artificial Intelligence and Machine Learning\n• GPA: 3.85/4.0\n• Teaching Assistant for Intro to Programming"
        },
        {
          id: uuidv4(),
          institution: "Stanford University",
          degree: "Bachelor's Degree",
          field: "Software Engineering",
          location: "Stanford, CA",
          startDate: "2012-09",
          endDate: "2016-06",
          isCurrentlyStudying: false,
          description: "• Dean's List all semesters\n• Senior Project: Developed an AI-powered study assistant app\n• Member of Computer Science Club"
        }
      ],
      skills: [
        { id: uuidv4(), name: "JavaScript", level: 5 },
        { id: uuidv4(), name: "React", level: 5 },
        { id: uuidv4(), name: "Node.js", level: 4 },
        { id: uuidv4(), name: "TypeScript", level: 4 },
        { id: uuidv4(), name: "GraphQL", level: 3 },
        { id: uuidv4(), name: "AWS", level: 4 },
        { id: uuidv4(), name: "Docker", level: 3 },
        { id: uuidv4(), name: "Python", level: 3 }
      ],
      projects: [
        {
          id: uuidv4(),
          name: "AI Task Manager",
          description: "A productivity application that uses machine learning to prioritize tasks and suggest optimal work schedules based on user habits.",
          url: "github.com/alexj/ai-task-manager",
          startDate: "2021-06",
          endDate: "",
          isOngoing: true
        },
        {
          id: uuidv4(),
          name: "E-commerce Platform",
          description: "Developed a full-stack e-commerce platform with React, Node.js, and MongoDB, featuring real-time inventory tracking and payment processing.",
          url: "github.com/alexj/ecommerce-platform",
          startDate: "2020-02",
          endDate: "2020-11",
          isOngoing: false
        }
      ],
      template: "modern",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    updateCVData(sampleData);
    toast({
      title: "Sample data loaded",
      description: "Your CV has been filled with sample data"
    });
  };

  return (
    <CVContext.Provider value={{
      cvData,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      addSkill,
      updateSkill,
      removeSkill,
      addProject,
      updateProject,
      removeProject,
      enhanceText,
      setTemplate,
      resetCV,
      loadSampleData
    }}>
      {children}
    </CVContext.Provider>
  );
};

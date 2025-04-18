
import React from "react";
import { CVData } from "@/lib/models";

interface ModernTemplateProps {
  data: CVData;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div id="cv-template-modern" className="bg-white text-cv-text p-8 max-w-[800px] mx-auto font-sans">
      {/* Header */}
      <header className="mb-6 border-b pb-6 border-cv-primary/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-cv-secondary">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-cv-primary font-medium text-xl mt-1">
              {personalInfo.title}
            </p>
          </div>
          
          {personalInfo.profilePhoto && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-cv-primary">
              <img 
                src={personalInfo.profilePhoto} 
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <span className="font-medium">Email:</span>
              <span className="ml-1">{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <span className="font-medium">Phone:</span>
              <span className="ml-1">{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <span className="font-medium">Location:</span>
              <span className="ml-1">{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <span className="font-medium">Website:</span>
              <span className="ml-1">{personalInfo.website}</span>
            </div>
          )}
        </div>
        
        {personalInfo.summary && (
          <div className="mt-4 text-sm">
            <p>{personalInfo.summary}</p>
          </div>
        )}
      </header>

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-cv-secondary border-b border-cv-primary/20 pb-1 mb-3">
            Professional Experience
          </h2>
          
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="flex flex-col md:flex-row justify-between mb-1">
                  <div>
                    <h3 className="font-bold">{exp.position}</h3>
                    <p className="text-cv-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>{exp.location}</p>
                    <p>
                      {formatDate(exp.startDate)} - {exp.isCurrentPosition ? "Present" : formatDate(exp.endDate)}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm whitespace-pre-line">
                  {exp.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-cv-secondary border-b border-cv-primary/20 pb-1 mb-3">
            Education
          </h2>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="relative">
                <div className="flex flex-col md:flex-row justify-between mb-1">
                  <div>
                    <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                    <p className="text-cv-primary font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p>{edu.location}</p>
                    <p>
                      {formatDate(edu.startDate)} - {edu.isCurrentlyStudying ? "Present" : formatDate(edu.endDate)}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm whitespace-pre-line">
                  {edu.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two column layout for Skills & Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-cv-secondary border-b border-cv-primary/20 pb-1 mb-3">
              Skills
            </h2>
            
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="relative">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{skill.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-2 w-5 rounded-sm ${
                            i < skill.level ? 'bg-cv-primary' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-cv-secondary border-b border-cv-primary/20 pb-1 mb-3">
              Projects
            </h2>
            
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="relative">
                  <div className="mb-1">
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-xs text-cv-muted">
                      {formatDate(project.startDate)} - {project.isOngoing ? "Present" : formatDate(project.endDate)}
                    </p>
                  </div>
                  
                  <div className="text-sm">
                    <p>{project.description}</p>
                    {project.url && (
                      <a 
                        href={project.url.startsWith('http') ? project.url : `https://${project.url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cv-primary hover:underline mt-1 inline-block text-xs"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;


import React, { useMemo } from "react";
import { useCVContext } from "@/context/CVContext";
import ModernTemplate from "./cv-templates/ModernTemplate";
import { toast } from "@/hooks/use-toast";

const CVPreview: React.FC = () => {
  const { cvData } = useCVContext();
  
  const TemplateComponent = useMemo(() => {
    try {
      // For now we only have one template, but this structure allows for future template additions
      switch(cvData.template) {
        case 'modern':
        default:
          return ModernTemplate;
      }
    } catch (error) {
      console.error("Error loading template:", error);
      toast({
        title: "Template Error",
        description: "Failed to load the selected template. Using default instead.",
        variant: "destructive"
      });
      return ModernTemplate; // Fallback to Modern template
    }
  }, [cvData.template]);

  if (!TemplateComponent) {
    toast({
      title: "Template Error",
      description: "The selected template could not be loaded. Please try a different one.",
      variant: "destructive"
    });
    return <div className="p-8 text-center text-red-500">Template could not be loaded</div>;
  }

  return (
    <div className="template-container">
      <TemplateComponent data={cvData} />
    </div>
  );
};

export default CVPreview;


import * as React from "react";
import { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "./cv-form/PersonalInfoForm";
import ExperienceForm from "./cv-form/ExperienceForm";
import EducationForm from "./cv-form/EducationForm";
import SkillsForm from "./cv-form/SkillsForm";
import ProjectsForm from "./cv-form/ProjectsForm";
import CVTemplateSelector from "./CVTemplateSelector";
import CVPreview from "./CVPreview";
import { DownloadIcon, Eye, ChevronLeft, ChevronRight, RefreshCw, FileUp } from "lucide-react";
import { exportCVToPDF } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

const CVEditor: React.FC = () => {
  const { resetCV, loadSampleData } = useCVContext();
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const fileName = "my-cv";
      await exportCVToPDF("cv-template-modern", fileName);
      setIsExporting(false);
    } catch (error) {
      setIsExporting(false);
      console.error("Error exporting PDF:", error);
      toast({
        title: "Export failed",
        description: "Could not export the CV to PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleContinue = () => {
    if (activeTab === "personal") {
      setActiveTab("experience");
    } else if (activeTab === "experience") {
      setActiveTab("education");
    } else if (activeTab === "education") {
      setActiveTab("skills");
    } else if (activeTab === "skills") {
      setActiveTab("projects");
    } else if (activeTab === "projects") {
      setActiveTab("template");
    } else if (activeTab === "template") {
      setShowPreview(true);
    }
  };

  const handleBack = () => {
    if (activeTab === "experience") {
      setActiveTab("personal");
    } else if (activeTab === "education") {
      setActiveTab("experience");
    } else if (activeTab === "skills") {
      setActiveTab("education");
    } else if (activeTab === "projects") {
      setActiveTab("skills");
    } else if (activeTab === "template") {
      setActiveTab("projects");
    } else if (showPreview) {
      setShowPreview(false);
      setActiveTab("template");
    }
  };

  return (
    <div className="container max-w-6xl py-8">
      {showPreview ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
            <Button 
              variant="outline"
              onClick={handleBack}
              className="flex items-center gap-1 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button 
                onClick={handleExportPDF}
                disabled={isExporting}
                className="bg-cv-primary hover:bg-cv-primary/90 text-white transition-all"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="cv-preview bg-white p-6 rounded-lg shadow-md">
            <CVPreview />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b pb-4 mb-4 bg-white p-4 rounded-t-lg shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">CV Editor</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={resetCV}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Reset
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={loadSampleData}
                className="flex items-center gap-1"
              >
                <FileUp className="h-3.5 w-3.5 mr-1" />
                Load Sample
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full mb-6 gap-2">
              <TabsTrigger 
                value="personal" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger 
                value="experience" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="education" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Education
              </TabsTrigger>
              <TabsTrigger 
                value="skills" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="projects" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger 
                value="template" 
                className="text-xs sm:text-base data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 px-2 py-1.5"
              >
                Template
              </TabsTrigger>
            </TabsList>
            
            <div className="cv-editor-container grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="form-container lg:col-span-2">
                <TabsContent value="personal">
                  <PersonalInfoForm />
                </TabsContent>
                
                <TabsContent value="experience">
                  <ExperienceForm />
                </TabsContent>
                
                <TabsContent value="education">
                  <EducationForm />
                </TabsContent>
                
                <TabsContent value="skills">
                  <SkillsForm />
                </TabsContent>
                
                <TabsContent value="projects">
                  <ProjectsForm />
                </TabsContent>
                
                <TabsContent value="template">
                  <CVTemplateSelector />
                </TabsContent>
              </div>
              
              <div className="preview-container hidden lg:block lg:col-span-1">
                <div className="sticky top-8 bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Live Preview</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowPreview(true)}
                      className="text-xs flex items-center hover:bg-purple-100"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Full Preview
                    </Button>
                  </div>
                  <div className="cv-preview overflow-auto max-h-[calc(100vh-200px)] border border-gray-200 rounded-md">
                    <CVPreview />
                  </div>
                </div>
              </div>
              
              {/* Mobile Preview Button */}
              <div className="lg:hidden flex justify-center mt-4">
                <Button 
                  onClick={() => setShowPreview(true)}
                  variant="outline"
                  className="w-full max-w-sm flex items-center justify-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View CV Preview
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between mt-8 pt-4 border-t">
              {activeTab !== "personal" && (
                <Button 
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center gap-1 hover:bg-gray-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <div className="ml-auto">
                <Button 
                  onClick={handleContinue}
                  className="flex items-center gap-1 bg-cv-primary hover:bg-cv-primary/90 text-white"
                >
                  {activeTab === "template" ? (
                    <>
                      Preview & Download
                      <Eye className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Save & Continue
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default CVEditor;

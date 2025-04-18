
import React, { useState } from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CVPreview from "./CVPreview";

// Fixed list of available templates
const templates = [
  {
    id: "modern",
    name: "Modern",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=400&q=80",
  }
];

const CVTemplateSelector: React.FC = () => {
  const { cvData, setTemplate } = useCVContext();
  const selectedTemplate = cvData.template;
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId);
  };

  const closePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
              selectedTemplate === template.id ? 'ring-2 ring-cv-primary' : ''
            }`}
            onClick={() => setTemplate(template.id)}
          >
            <div className="relative aspect-[3/4]">
              <img 
                src={template.image} 
                alt={template.name}
                className="w-full h-full object-cover"
              />
              {selectedTemplate === template.id && (
                <div className="absolute inset-0 bg-cv-primary/20 flex items-center justify-center">
                  <div className="bg-cv-primary text-white p-2 rounded-full">
                    <Check className="h-6 w-6" />
                  </div>
                </div>
              )}
            </div>
            
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{template.name}</p>
                <div className="flex gap-2">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setTemplate(template.id);
                    }}
                  >
                    {selectedTemplate === template.id ? "Selected" : "Select"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreviewTemplate(template.id);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => closePreview()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-2">
            <h2 className="text-xl font-semibold mb-4">Template Preview</h2>
            <CVPreview />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CVTemplateSelector;

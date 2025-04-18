
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCVContext } from "@/context/CVContext";
import { EnhancableTextarea, ImageUpload } from "@/components/ui-elements";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PersonalInfoForm: React.FC = () => {
  const { cvData, updatePersonalInfo } = useCVContext();
  const { personalInfo } = cvData;

  const handleChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  const handleProfilePhotoChange = (imageDataUrl: string) => {
    updatePersonalInfo({ profilePhoto: imageDataUrl });
  };

  return (
    <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-gray-400 hover:text-gray-600 cursor-help">
                  <Info className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                This information will appear at the top of your CV. Make sure it's accurate and professional.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <h3 className="text-lg font-medium text-gray-700">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName || ""}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="John"
                  className="focus:border-purple-400 transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName || ""}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Doe"
                  className="focus:border-purple-400 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="title" className="text-gray-700">Professional Title</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-gray-400 hover:text-gray-600 cursor-help">
                        <Info className="h-3 w-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-[250px]">
                        Your professional title should reflect your current position or the position you're applying for.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="title"
                value={personalInfo.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="focus:border-purple-400 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john.doe@example.com"
                className="focus:border-purple-400 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
              <Input
                id="phone"
                value={personalInfo.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="(123) 456-7890"
                className="focus:border-purple-400 transition-colors"
              />
            </div>
          </div>
          
          <div className="space-y-5">
            <h3 className="text-lg font-medium text-gray-700">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">Location</Label>
              <Input
                id="location"
                value={personalInfo.location || ""}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="City, State"
                className="focus:border-purple-400 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-700">Website/Portfolio</Label>
              <Input
                id="website"
                value={personalInfo.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="yourwebsite.com"
                className="focus:border-purple-400 transition-colors"
              />
            </div>
            
            <div className="mt-4">
              <ImageUpload 
                onImageSelected={handleProfilePhotoChange} 
                currentImage={personalInfo.profilePhoto}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <Label htmlFor="summary" className="text-gray-700">Professional Summary</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-gray-400 hover:text-gray-600 cursor-help">
                    <Info className="h-3 w-3" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-[250px]">
                    A great summary highlights your key professional attributes and career goals in 3-5 sentences. Use AI to enhance it.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <EnhancableTextarea
            value={personalInfo.summary || ""}
            onChange={(value) => handleChange("summary", value)}
            placeholder="Write a brief summary of your professional background, skills, and career objectives..."
            role="professional summary"
            context="This is for a CV/resume professional summary section, highlighting key qualifications and career objectives."
            className="min-h-[150px] focus:border-purple-400"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoForm;

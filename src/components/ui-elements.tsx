import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Wand2, Loader2, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import { useCVContext } from "@/context/CVContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface EnhancableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  role?: string;
  context?: string;
  label?: string;
}

export const EnhancableTextarea: React.FC<EnhancableTextareaProps> = ({
  value,
  onChange,
  placeholder = "Enter description...",
  className = "",
  role = "resume",
  context = "",
  label
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [history, setHistory] = useState<{original: string, enhanced: string}[]>([]);
  const { enhanceText } = useCVContext();

  const handleEnhance = async () => {
    if (!value.trim() || value.length < 10) {
      toast({
        title: "Text too short",
        description: "Please enter at least 10 characters to enhance.",
        variant: "destructive"
      });
      return;
    }
    
    setIsEnhancing(true);
    try {
      const originalText = value;
      
      const enhancedText = await enhanceText(value, role, context);
      if (enhancedText && enhancedText !== value) {
        setHistory(prev => [...prev, {original: originalText, enhanced: enhancedText}]);
        onChange(enhancedText);
        toast({
          title: "Content Enhanced",
          description: "Your text has been professionally enhanced with AI."
        });
      } else {
        toast({
          title: "No changes made",
          description: "AI couldn't find improvements to make to your text."
        });
      }
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: "An error occurred while enhancing your text.",
        variant: "destructive"
      });
      console.error("Enhancement error:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      onChange(lastEntry.original);
      setHistory(prev => prev.slice(0, -1));
      toast({
        title: "Changes reverted",
        description: "Reverted to your original text."
      });
    }
  };

  const tooltipText = role === "professional summary" ? 
    "Transform your summary into a compelling professional narrative" :
    role === "work experience" ?
    "Convert responsibilities into achievement-focused bullet points" :
    role === "education" ?
    "Highlight academic achievements and relevant coursework" :
    role === "project description" ?
    "Showcase project highlights and technologies used" :
    role === "skills" ?
    "Optimize skills with industry-standard terminology" :
    "Professionally enhance your text with industry-specific terminology";

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <div className="flex space-x-2">
            {history.length > 0 && (
              <Button
                onClick={handleUndo}
                type="button"
                size="sm"
                variant="outline"
                className="text-gray-600"
              >
                Undo Changes
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleEnhance}
                    disabled={isEnhancing || !value || value.length < 10}
                    type="button"
                    size="sm"
                    variant="outline"
                    className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                  >
                    {isEnhancing ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Enhancing...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-3 w-3 mr-1" />
                        Enhance with AI
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px] bg-purple-50 border-purple-100">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-700">{tooltipText}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn("min-h-[100px] transition-all focus:border-purple-400", className)}
      />
      {!label && (
        <div className="flex justify-end space-x-2">
          {history.length > 0 && (
            <Button
              onClick={handleUndo}
              type="button"
              size="sm"
              variant="outline"
              className="text-gray-600"
            >
              Undo Changes
            </Button>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleEnhance}
                  disabled={isEnhancing || !value || value.length < 10}
                  type="button"
                  size="sm"
                  variant="outline"
                  className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 hover:text-purple-800"
                >
                  {isEnhancing ? (
                    <>
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-3 w-3 mr-1" />
                      Enhance with AI
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] bg-purple-50 border-purple-100">
                <div className="flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-700">{tooltipText}</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

interface DatePickerWithRangeProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  isPresentOption?: boolean;
  onIsPresentChange?: (isPresent: boolean) => void;
}

export const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  isPresentOption = false,
  onIsPresentChange
}) => {
  const [isPresent, setIsPresent] = useState(isPresentOption);

  const handlePresentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setIsPresent(newValue);
    if (onIsPresentChange) {
      onIsPresentChange(newValue);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Start Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              {startDate ? format(startDate, "MMM yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={onStartDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label>End Date</Label>
        <div className="space-y-2">
          {isPresentOption && (
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                id="isPresentCheckbox"
                checked={isPresent}
                onChange={handlePresentChange}
                className="rounded border-gray-300 text-cv-primary focus:ring-cv-primary"
              />
              <Label htmlFor="isPresentCheckbox" className="text-sm font-normal">
                Present / Current
              </Label>
            </div>
          )}
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  (!endDate || isPresent) && "text-muted-foreground"
                )}
                disabled={isPresent}
              >
                {isPresent 
                  ? "Present" 
                  : endDate 
                  ? format(endDate, "MMM yyyy") 
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={onEndDateChange}
                initialFocus
                disabled={isPresent}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

interface SkillLevelInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const SkillLevelInput: React.FC<SkillLevelInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Skill Level</Label>
        <span className="text-sm text-muted-foreground">{value}/5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={cn(
              "h-6 w-full rounded-sm transition-colors",
              level <= value ? "bg-cv-primary" : "bg-gray-200 hover:bg-gray-300"
            )}
            aria-label={`Skill Level ${level}`}
          />
        ))}
      </div>
    </div>
  );
};

interface ImageUploadProps {
  onImageSelected: (imageDataUrl: string) => void;
  currentImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, currentImage }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size should not exceed 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setPreviewUrl(result);
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        {previewUrl ? (
          <div className="relative mb-4">
            <img
              src={previewUrl}
              alt="Profile preview"
              className="w-32 h-32 object-cover rounded-full border-2 border-cv-primary"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={() => {
                setPreviewUrl(undefined);
                onImageSelected("");
              }}
            >
              Remove Photo
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-100 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
            <span className="text-gray-400 text-sm text-center px-2">
              No profile photo
            </span>
          </div>
        )}
        
        <div className="w-full">
          <Label htmlFor="profile-photo" className="block mb-2">
            Profile Photo
          </Label>
          <Input
            id="profile-photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: square image, max 2MB
          </p>
        </div>
      </div>
    </div>
  );
};

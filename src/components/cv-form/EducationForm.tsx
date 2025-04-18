
import React from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { EnhancableTextarea, DatePickerWithRange } from "@/components/ui-elements";
import { format, parse } from "date-fns";

const EducationForm: React.FC = () => {
  const { cvData, addEducation, updateEducation, removeEducation } = useCVContext();
  const { education } = cvData;

  const handleStartDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateEducation(id, { startDate: format(date, "yyyy-MM") });
    }
  };

  const handleEndDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateEducation(id, { endDate: format(date, "yyyy-MM") });
    }
  };

  const parseDate = (dateStr: string): Date | undefined => {
    if (!dateStr) return undefined;
    try {
      return parse(dateStr, "yyyy-MM", new Date());
    } catch (e) {
      console.error("Error parsing date", e);
      return undefined;
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button onClick={addEducation} type="button" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              No education entries yet. Click "Add Education" to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`}>School/University</Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution || ""}
                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                        placeholder="Institution name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${edu.id}`}>Location</Label>
                      <Input
                        id={`location-${edu.id}`}
                        value={edu.location || ""}
                        onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree || ""}
                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                        placeholder="e.g. Bachelor's Degree"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field || ""}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                  </div>

                  <DatePickerWithRange
                    startDate={parseDate(edu.startDate)}
                    endDate={parseDate(edu.endDate)}
                    onStartDateChange={(date) => handleStartDateChange(edu.id, date)}
                    onEndDateChange={(date) => handleEndDateChange(edu.id, date)}
                    isPresentOption={edu.isCurrentlyStudying}
                    onIsPresentChange={(isPresent) => updateEducation(edu.id, { isCurrentlyStudying: isPresent })}
                  />

                  <div className="space-y-2">
                    <EnhancableTextarea
                      value={edu.description || ""}
                      onChange={(value) => updateEducation(edu.id, { description: value })}
                      placeholder="List accomplishments, activities, GPA, etc."
                      role="education"
                      context={`For ${edu.degree} in ${edu.field} at ${edu.institution}`}
                      label="Description"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationForm;


import React from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { EnhancableTextarea, DatePickerWithRange } from "@/components/ui-elements";
import { format, parse } from "date-fns";

const ExperienceForm: React.FC = () => {
  const { cvData, addExperience, updateExperience, removeExperience } = useCVContext();
  const { experiences } = cvData;

  const handleStartDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateExperience(id, { startDate: format(date, "yyyy-MM") });
    }
  };

  const handleEndDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateExperience(id, { endDate: format(date, "yyyy-MM") });
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
          <h3 className="text-lg font-semibold">Professional Experience</h3>
          <Button onClick={addExperience} type="button" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              No experience entries yet. Click "Add Experience" to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company/Organization</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company || ""}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`position-${exp.id}`}>Job Title</Label>
                      <Input
                        id={`position-${exp.id}`}
                        value={exp.position || ""}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        placeholder="Position title"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      value={exp.location || ""}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>

                  <DatePickerWithRange
                    startDate={parseDate(exp.startDate)}
                    endDate={parseDate(exp.endDate)}
                    onStartDateChange={(date) => handleStartDateChange(exp.id, date)}
                    onEndDateChange={(date) => handleEndDateChange(exp.id, date)}
                    isPresentOption={exp.isCurrentPosition}
                    onIsPresentChange={(isPresent) => updateExperience(exp.id, { isCurrentPosition: isPresent })}
                  />

                  <div className="space-y-2">
                    <EnhancableTextarea
                      value={exp.description || ""}
                      onChange={(value) => updateExperience(exp.id, { description: value })}
                      placeholder="Describe your responsibilities and achievements..."
                      role="work experience"
                      context={`For a ${exp.position} position at ${exp.company}`}
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

export default ExperienceForm;

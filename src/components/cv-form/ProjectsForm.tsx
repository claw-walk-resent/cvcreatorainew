
import React from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { EnhancableTextarea, DatePickerWithRange } from "@/components/ui-elements";
import { format, parse } from "date-fns";

const ProjectsForm: React.FC = () => {
  const { cvData, addProject, updateProject, removeProject } = useCVContext();
  const { projects } = cvData;

  const handleStartDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateProject(id, { startDate: format(date, "yyyy-MM") });
    }
  };

  const handleEndDateChange = (id: string, date: Date | undefined) => {
    if (date) {
      updateProject(id, { endDate: format(date, "yyyy-MM") });
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
          <h3 className="text-lg font-semibold">Projects</h3>
          <Button onClick={addProject} type="button" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              No projects added yet. Click "Add Project" to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`project-${project.id}`}>Project Name</Label>
                    <Input
                      id={`project-${project.id}`}
                      value={project.name || ""}
                      onChange={(e) => updateProject(project.id, { name: e.target.value })}
                      placeholder="Project name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`url-${project.id}`}>Project URL</Label>
                    <Input
                      id={`url-${project.id}`}
                      value={project.url || ""}
                      onChange={(e) => updateProject(project.id, { url: e.target.value })}
                      placeholder="github.com/yourusername/project (optional)"
                    />
                  </div>

                  <DatePickerWithRange
                    startDate={parseDate(project.startDate)}
                    endDate={parseDate(project.endDate)}
                    onStartDateChange={(date) => handleStartDateChange(project.id, date)}
                    onEndDateChange={(date) => handleEndDateChange(project.id, date)}
                    isPresentOption={project.isOngoing}
                    onIsPresentChange={(isOngoing) => updateProject(project.id, { isOngoing })}
                  />

                  <div className="space-y-2">
                    <EnhancableTextarea
                      value={project.description || ""}
                      onChange={(value) => updateProject(project.id, { description: value })}
                      placeholder="Describe the project, your role, and notable achievements..."
                      role="project description"
                      context={`For a project named ${project.name}`}
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

export default ProjectsForm;

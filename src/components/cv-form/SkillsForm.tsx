
import React from "react";
import { useCVContext } from "@/context/CVContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { SkillLevelInput } from "@/components/ui-elements";
import { Label } from "@/components/ui/label";

const SkillsForm: React.FC = () => {
  const { cvData, addSkill, updateSkill, removeSkill } = useCVContext();
  const { skills } = cvData;

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <Button onClick={addSkill} type="button" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {skills.length === 0 ? (
          <div className="text-center py-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">
              No skills added yet. Click "Add Skill" to create one.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="border rounded-lg p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-muted-foreground hover:text-destructive"
                  onClick={() => removeSkill(skill.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`skill-${skill.id}`}>Skill Name</Label>
                    <Input
                      id={`skill-${skill.id}`}
                      value={skill.name || ""}
                      onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                      placeholder="e.g. JavaScript, Project Management, etc."
                    />
                  </div>

                  <SkillLevelInput
                    value={skill.level}
                    onChange={(level) => updateSkill(skill.id, { level })}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsForm;

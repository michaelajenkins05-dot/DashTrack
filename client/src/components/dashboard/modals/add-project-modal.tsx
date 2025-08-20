import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "planning",
    progress: 0,
    deadline: ""
  });

  const { toast } = useToast();

  const addProjectMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submitData = {
        ...data,
        deadline: data.deadline || undefined
      };
      await apiRequest("POST", "/api/projects", submitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project added",
        description: "Your project has been created successfully.",
      });
      onClose();
      setFormData({
        name: "",
        description: "",
        status: "planning",
        progress: 0,
        deadline: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add project. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      addProjectMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add Project</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-white">Project Name</Label>
            <Input
              id="projectName"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter project name"
              className="bg-input border-border text-white"
              data-testid="input-project-name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectDescription" className="text-white">Description (Optional)</Label>
            <Textarea
              id="projectDescription"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter project description"
              className="bg-input border-border text-white resize-none"
              rows={3}
              data-testid="input-project-description"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="bg-input border-border text-white" data-testid="select-project-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="planning" className="text-white hover:bg-white/10">Planning</SelectItem>
                <SelectItem value="in-progress" className="text-white hover:bg-white/10">In Progress</SelectItem>
                <SelectItem value="completed" className="text-white hover:bg-white/10">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="projectDeadline" className="text-white">Deadline (Optional)</Label>
            <Input
              id="projectDeadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="bg-input border-border text-white"
              data-testid="input-project-deadline"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              data-testid="button-cancel-project"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={addProjectMutation.isPending || !formData.name}
              data-testid="button-save-project"
            >
              {addProjectMutation.isPending ? "Adding..." : "Add Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

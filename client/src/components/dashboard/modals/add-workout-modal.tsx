import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWorkoutModal({ isOpen, onClose }: AddWorkoutModalProps) {
  const [formData, setFormData] = useState({
    type: "",
    duration: "",
    calories: "",
    workoutDate: new Date().toISOString().split('T')[0]
  });

  const { toast } = useToast();

  const addWorkoutMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const submitData = {
        type: data.type,
        duration: parseInt(data.duration),
        calories: data.calories ? parseInt(data.calories) : undefined,
        workoutDate: data.workoutDate
      };
      await apiRequest("POST", "/api/workouts", submitData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workouts"] });
      toast({
        title: "Workout logged",
        description: "Your workout has been added successfully.",
      });
      onClose();
      setFormData({
        type: "",
        duration: "",
        calories: "",
        workoutDate: new Date().toISOString().split('T')[0]
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add workout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.type && formData.duration) {
      addWorkoutMutation.mutate(formData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add Workout</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workoutType" className="text-white">Workout Type</Label>
            <Input
              id="workoutType"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              placeholder="e.g., Cardio, Strength Training, Yoga"
              className="bg-input border-border text-white"
              data-testid="input-workout-type"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workoutDuration" className="text-white">Duration (minutes)</Label>
            <Input
              id="workoutDuration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="30"
              className="bg-input border-border text-white"
              data-testid="input-workout-duration"
              min="1"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workoutCalories" className="text-white">Calories Burned (Optional)</Label>
            <Input
              id="workoutCalories"
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData(prev => ({ ...prev, calories: e.target.value }))}
              placeholder="300"
              className="bg-input border-border text-white"
              data-testid="input-workout-calories"
              min="0"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workoutDate" className="text-white">Workout Date</Label>
            <Input
              id="workoutDate"
              type="date"
              value={formData.workoutDate}
              onChange={(e) => setFormData(prev => ({ ...prev, workoutDate: e.target.value }))}
              className="bg-input border-border text-white"
              data-testid="input-workout-date"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              data-testid="button-cancel-workout"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={addWorkoutMutation.isPending || !formData.type || !formData.duration}
              data-testid="button-save-workout"
            >
              {addWorkoutMutation.isPending ? "Adding..." : "Add Workout"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

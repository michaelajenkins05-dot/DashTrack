import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddHabitModal({ isOpen, onClose }: AddHabitModalProps) {
  const [name, setName] = useState("");

  const { toast } = useToast();

  const addHabitMutation = useMutation({
    mutationFn: async (name: string) => {
      await apiRequest("POST", "/api/habits", {
        name,
        streak: 0,
        weekProgress: [false, false, false, false, false, false, false]
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      toast({
        title: "Habit added",
        description: "Your new habit has been added to the tracker.",
      });
      onClose();
      setName("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add habit. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addHabitMutation.mutate(name.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add Habit</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="habitName" className="text-white">Habit Name</Label>
            <Input
              id="habitName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Exercise daily, Read 30 minutes"
              className="bg-input border-border text-white"
              data-testid="input-habit-name"
              required
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              data-testid="button-cancel-habit"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={addHabitMutation.isPending || !name.trim()}
              data-testid="button-save-habit"
            >
              {addHabitMutation.isPending ? "Adding..." : "Add Habit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

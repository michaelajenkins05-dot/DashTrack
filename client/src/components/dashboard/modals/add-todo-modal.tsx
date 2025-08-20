import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTodoModal({ isOpen, onClose }: AddTodoModalProps) {
  const [text, setText] = useState("");

  const { toast } = useToast();

  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      await apiRequest("POST", "/api/todos", { text, completed: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
      toast({
        title: "Todo added",
        description: "Your task has been added to the list.",
      });
      onClose();
      setText("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add todo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodoMutation.mutate(text.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add Todo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="todoText" className="text-white">Task</Label>
            <Input
              id="todoText"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your task"
              className="bg-input border-border text-white"
              data-testid="input-todo-text"
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
              data-testid="button-cancel-todo"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={addTodoMutation.isPending || !text.trim()}
              data-testid="button-save-todo"
            >
              {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

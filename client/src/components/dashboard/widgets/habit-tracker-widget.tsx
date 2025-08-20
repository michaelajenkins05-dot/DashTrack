import { CheckCircle, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AddHabitModal } from "../modals/add-habit-modal";
import type { Habit } from "@shared/schema";

export function HabitTrackerWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: habits = [], isLoading } = useQuery<Habit[]>({
    queryKey: ["/api/habits"],
  });

  const updateHabitMutation = useMutation({
    mutationFn: async ({ id, weekProgress }: { id: string; weekProgress: boolean[] }) => {
      await apiRequest("PATCH", `/api/habits/${id}`, { weekProgress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
    },
  });

  const toggleHabitDay = (habitId: string, dayIndex: number, currentProgress: boolean[]) => {
    const newProgress = [...currentProgress];
    newProgress[dayIndex] = !newProgress[dayIndex];
    updateHabitMutation.mutate({ id: habitId, weekProgress: newProgress });
  };

  const getDotClass = (completed: boolean, dayIndex: number) => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const adjustedToday = today === 0 ? 6 : today - 1; // Convert to 0-6 where 0 = Monday
    
    if (dayIndex < adjustedToday) {
      return completed ? 'habit-dot completed' : 'habit-dot missed';
    } else if (dayIndex === adjustedToday) {
      return 'habit-dot pending';
    } else {
      return 'habit-dot pending';
    }
  };

  return (
    <>
      <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-habit-tracker">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <CheckCircle className="text-dashboard-cyan mr-2" size={20} />
            Habits
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-cyan hover:text-cyan-300"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="button-add-habit"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : habits.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No habits yet. Add your first habit!
            </div>
          ) : (
            habits.map((habit) => (
              <div 
                key={habit.id}
                className="bg-white/5 rounded-lg p-3"
                data-testid={`habit-${habit.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white font-medium">{habit.name}</span>
                  <span className="text-xs text-dashboard-cyan">
                    {habit.streak || 0} day streak
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {(habit.weekProgress || [false, false, false, false, false, false, false]).map((completed, dayIndex) => (
                    <button
                      key={dayIndex}
                      className={getDotClass(completed, dayIndex)}
                      onClick={() => toggleHabitDay(habit.id, dayIndex, habit.weekProgress || [false, false, false, false, false, false, false])}
                      title={`${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][dayIndex]}: ${completed ? 'Completed' : 'Not completed'}`}
                      data-testid={`habit-dot-${habit.id}-${dayIndex}`}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}

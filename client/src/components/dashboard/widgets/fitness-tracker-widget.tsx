import { Dumbbell, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AddWorkoutModal } from "../modals/add-workout-modal";
import type { Workout } from "@shared/schema";

export function FitnessTrackerWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: workouts = [], isLoading } = useQuery<Workout[]>({
    queryKey: ["/api/workouts"],
  });

  // Calculate fitness stats
  const today = new Date().toISOString().split('T')[0];
  const todayWorkouts = workouts.filter(w => w.workoutDate === today);
  const totalSteps = 8347; // Mock data - would come from fitness API
  const totalCalories = todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0) + 420; // Base calories

  // Weekly workout goal
  const thisWeek = new Date();
  const startOfWeek = new Date(thisWeek.setDate(thisWeek.getDate() - thisWeek.getDay() + 1));
  const weekWorkouts = workouts.filter(w => new Date(w.workoutDate) >= startOfWeek);
  const weeklyGoal = 5;
  const weeklyProgress = (weekWorkouts.length / weeklyGoal) * 100;

  return (
    <>
      <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-fitness-tracker">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Dumbbell className="text-dashboard-red mr-2" size={20} />
            Fitness
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-red hover:text-red-300"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="button-add-workout"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-lg font-bold text-dashboard-red" data-testid="text-steps-today">
                {totalSteps.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">Steps today</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-dashboard-orange" data-testid="text-calories-burned">
                {totalCalories}
              </p>
              <p className="text-xs text-gray-400">Calories burned</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {isLoading ? (
              <div className="text-center text-gray-400 py-2">Loading workouts...</div>
            ) : workouts.slice(0, 2).map((workout) => (
              <div 
                key={workout.id}
                className="bg-white/5 rounded-lg p-3"
                data-testid={`workout-${workout.id}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-white font-medium">{workout.type}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(workout.workoutDate).toLocaleDateString() === today ? 'Today' : 
                     new Date(workout.workoutDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{workout.duration} min</span>
                  <span className="text-xs text-dashboard-red">{workout.calories || 0} cal</span>
                </div>
              </div>
            ))}
            
            {workouts.length === 0 && !isLoading && (
              <div className="text-center text-gray-400 py-2 text-sm">
                No workouts logged yet
              </div>
            )}
          </div>
          
          <div className="bg-white/5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white">Weekly Goal</span>
              <span className="text-sm text-gray-400" data-testid="text-weekly-progress">
                {weekWorkouts.length}/{weeklyGoal} workouts
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-dashboard-red to-pink-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      <AddWorkoutModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}

import { Utensils, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { Meal } from "@shared/schema";

export function MealPlanningWidget() {
  const { data: meals = [], isLoading } = useQuery<Meal[]>({
    queryKey: ["/api/meals"],
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Group meals by day of week and meal type
  const mealsByDay = weekDays.map((day, dayIndex) => {
    const dayMeals = meals.filter(meal => meal.dayOfWeek === dayIndex + 1);
    return {
      day,
      breakfast: dayMeals.find(m => m.mealType === 'breakfast')?.name || '',
      lunch: dayMeals.find(m => m.mealType === 'lunch')?.name || '',
      dinner: dayMeals.find(m => m.mealType === 'dinner')?.name || ''
    };
  });

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-meal-planning">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Utensils className="text-dashboard-orange mr-2" size={20} />
          Meal Planning
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-dashboard-orange hover:text-orange-300"
          data-testid="button-add-meal"
        >
          <Plus size={18} />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {mealsByDay.map((dayData, index) => (
          <div key={index} className="text-center" data-testid={`meal-day-${index}`}>
            <p className="text-xs text-gray-400 mb-2">{dayData.day}</p>
            <div className="bg-white/5 rounded-lg p-2 min-h-16 hover:bg-white/10 transition-colors cursor-pointer">
              {dayData.breakfast && (
                <p className="text-xs text-white font-medium mb-1 truncate" title={dayData.breakfast}>
                  {dayData.breakfast}
                </p>
              )}
              {dayData.lunch && (
                <p className="text-xs text-gray-400 truncate" title={dayData.lunch}>
                  {dayData.lunch}
                </p>
              )}
              {dayData.dinner && (
                <p className="text-xs text-gray-500 truncate" title={dayData.dinner}>
                  {dayData.dinner}
                </p>
              )}
              {!dayData.breakfast && !dayData.lunch && !dayData.dinner && (
                <div className="flex items-center justify-center h-full">
                  <Plus size={12} className="text-gray-600" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

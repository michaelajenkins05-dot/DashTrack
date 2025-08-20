import { Clock, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { ScheduleItem } from "@shared/schema";

export function DailyScheduleWidget() {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: scheduleItems = [], isLoading } = useQuery<ScheduleItem[]>({
    queryKey: ["/api/schedule", { date: today }],
  });

  const getActivityColor = (index: number) => {
    const colors = [
      'bg-dashboard-teal',
      'bg-dashboard-blue', 
      'bg-dashboard-green',
      'bg-dashboard-purple',
      'bg-dashboard-orange',
      'bg-dashboard-red'
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-daily-schedule">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Clock className="text-dashboard-teal mr-2" size={20} />
          Daily Schedule
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-dashboard-teal hover:text-teal-300"
          data-testid="button-add-schedule-item"
        >
          <Plus size={18} />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
        {isLoading ? (
          <div className="text-center text-gray-400 py-4">Loading...</div>
        ) : scheduleItems.length === 0 ? (
          <div className="text-center text-gray-400 py-4">
            No activities scheduled for today
          </div>
        ) : (
          scheduleItems.map((item, index) => (
            <div 
              key={item.id}
              className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors"
              data-testid={`schedule-item-${item.id}`}
            >
              <div className="w-12 text-xs text-dashboard-teal font-mono">
                {item.time}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">{item.activity}</p>
                <p className="text-xs text-gray-400">{item.duration} min</p>
              </div>
              <div className={`w-2 h-2 ${getActivityColor(index)} rounded-full`}></div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

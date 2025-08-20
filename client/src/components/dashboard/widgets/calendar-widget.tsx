import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CalendarWidget() {
  // Mock data - in real app this would connect to iCal API
  const currentDate = new Date();
  const todayEvents = [
    {
      id: "1",
      title: "Team Meeting",
      time: "10:00 AM - 11:00 AM",
      color: "bg-dashboard-blue"
    },
    {
      id: "2",
      title: "Doctor Appointment", 
      time: "2:30 PM - 3:30 PM",
      color: "bg-dashboard-red"
    }
  ];

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-calendar">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Calendar className="text-dashboard-blue mr-2" size={20} />
          Calendar
        </h3>
        <span className="text-xs text-gray-400 bg-dashboard-blue/20 px-2 py-1 rounded-full">iCal</span>
      </div>
      
      <div className="space-y-3">
        <div className="text-center">
          <p className="text-2xl font-bold text-white" data-testid="text-current-date">
            {currentDate.getDate()}
          </p>
          <p className="text-sm text-gray-400" data-testid="text-current-month">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin">
          {todayEvents.length === 0 ? (
            <div className="text-center text-gray-400 py-4 text-sm">
              No events today
            </div>
          ) : (
            todayEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white/5 rounded-lg p-3"
                data-testid={`calendar-event-${event.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{event.title}</p>
                    <p className="text-xs text-gray-400">{event.time}</p>
                  </div>
                  <div className={`w-3 h-3 ${event.color} rounded-full flex-shrink-0 mt-1`}></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}

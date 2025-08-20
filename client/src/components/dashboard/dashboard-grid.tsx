import { ReadingProgressWidget } from "./widgets/reading-progress-widget";
import { MusicTrackingWidget } from "./widgets/music-tracking-widget";
import { TodoWidget } from "./widgets/todo-widget";
import { CalendarWidget } from "./widgets/calendar-widget";
import { MealPlanningWidget } from "./widgets/meal-planning-widget";
import { ProjectManagementWidget } from "./widgets/project-management-widget";
import { RSSFeedWidget } from "./widgets/rss-feed-widget";
import { BudgetTrackerWidget } from "./widgets/budget-tracker-widget";
import { DailyScheduleWidget } from "./widgets/daily-schedule-widget";
import { HabitTrackerWidget } from "./widgets/habit-tracker-widget";
import { FitnessTrackerWidget } from "./widgets/fitness-tracker-widget";

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
      <ReadingProgressWidget />
      <MusicTrackingWidget />
      <TodoWidget />
      <CalendarWidget />
      <div className="col-span-1 md:col-span-2">
        <MealPlanningWidget />
      </div>
      <ProjectManagementWidget />
      <RSSFeedWidget />
      <BudgetTrackerWidget />
      <DailyScheduleWidget />
      <HabitTrackerWidget />
      <FitnessTrackerWidget />
    </div>
  );
}

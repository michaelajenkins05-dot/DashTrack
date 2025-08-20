import { Book } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReadingProgressWidget() {
  // Mock data - in real app this would connect to Goodreads API
  const readingProgress = {
    currentBook: {
      title: "The Midnight Library",
      author: "Matt Haig",
      progress: 60
    },
    yearlyGoal: {
      target: 20,
      completed: 12
    }
  };

  const circumference = 283;
  const strokeDashoffset = circumference - (readingProgress.currentBook.progress / 100) * circumference;

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-reading-progress">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Book className="text-dashboard-amber mr-2" size={20} />
          Reading Progress
        </h3>
        <span className="text-xs text-gray-400 bg-dashboard-amber/20 px-2 py-1 rounded-full">Goodreads</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                stroke="rgba(245, 158, 11, 0.2)" 
                strokeWidth="8" 
                fill="none" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                stroke="#f59e0b" 
                strokeWidth="8" 
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="progress-ring" 
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-dashboard-amber">
                {readingProgress.currentBook.progress}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-1">Currently Reading:</p>
          <p className="font-medium text-white text-sm" data-testid="text-current-book">
            {readingProgress.currentBook.title}
          </p>
          <p className="text-xs text-gray-400">by {readingProgress.currentBook.author}</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Books read this year</span>
            <span className="text-white font-medium" data-testid="text-yearly-progress">
              {readingProgress.yearlyGoal.completed}/{readingProgress.yearlyGoal.target}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-dashboard-amber to-orange-400 h-2 rounded-full" 
              style={{ width: `${(readingProgress.yearlyGoal.completed / readingProgress.yearlyGoal.target) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

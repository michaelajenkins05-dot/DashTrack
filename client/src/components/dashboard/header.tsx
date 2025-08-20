import { Bell, Settings, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center">
              <Gauge className="text-white text-lg" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Personal Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, <span>Alex</span></p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              data-testid="button-notifications"
            >
              <Bell size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-white/10"
              data-testid="button-settings"
            >
              <Settings size={18} />
            </Button>
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

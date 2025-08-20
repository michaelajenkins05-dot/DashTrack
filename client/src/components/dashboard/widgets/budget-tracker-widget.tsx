import { Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

export function BudgetTrackerWidget() {
  // Mock budget data - in real app this would connect to Copilot API
  const budgetData = {
    remaining: 2347,
    categories: [
      { name: "Food & Dining", spent: 420, budget: 500, color: "from-dashboard-emerald to-green-400" },
      { name: "Transportation", spent: 180, budget: 300, color: "from-dashboard-blue to-cyan-400" },
      { name: "Entertainment", spent: 95, budget: 200, color: "from-dashboard-purple to-pink-400" }
    ]
  };

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-budget-tracker">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Wallet className="text-dashboard-emerald mr-2" size={20} />
          Budget
        </h3>
        <span className="text-xs text-gray-400 bg-dashboard-emerald/20 px-2 py-1 rounded-full">Copilot</span>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-dashboard-emerald" data-testid="text-budget-remaining">
            ${budgetData.remaining.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">Remaining this month</p>
        </div>
        
        <div className="space-y-3">
          {budgetData.categories.map((category, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3" data-testid={`budget-category-${index}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{category.name}</span>
                <span className="text-sm text-gray-400">
                  ${category.spent} / ${category.budget}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${(category.spent / category.budget) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AddTodoModal } from "../modals/add-todo-modal";
import type { TodoItem } from "@shared/schema";

export function TodoWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: todoItems = [], isLoading } = useQuery<TodoItem[]>({
    queryKey: ["/api/todos"],
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      await apiRequest("PATCH", `/api/todos/${id}`, { completed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/todos"] });
    },
  });

  const completedCount = todoItems.filter(item => item.completed).length;
  const totalCount = todoItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <>
      <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-todo">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <CheckSquare className="text-dashboard-green mr-2" size={20} />
            To-Do List
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-green hover:text-green-300"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="button-add-todo"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : todoItems.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No tasks yet. Add your first todo!
            </div>
          ) : (
            todoItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center space-x-3 p-2 hover:bg-white/5 rounded-lg transition-colors group"
                data-testid={`todo-item-${item.id}`}
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={(checked) =>
                    updateTodoMutation.mutate({ id: item.id, completed: !!checked })
                  }
                  className="data-[state=checked]:bg-dashboard-green data-[state=checked]:border-dashboard-green"
                  data-testid={`checkbox-todo-${item.id}`}
                />
                <span 
                  className={`text-sm flex-1 ${
                    item.completed ? "text-gray-400 line-through" : "text-white"
                  }`}
                >
                  {item.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                  onClick={() => deleteTodoMutation.mutate(item.id)}
                  data-testid={`button-delete-todo-${item.id}`}
                >
                  <Trash2 size={12} />
                </Button>
              </div>
            ))
          )}
        </div>
        
        {totalCount > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Progress</span>
              <span data-testid="text-todo-progress">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <div 
                className="bg-gradient-to-r from-dashboard-green to-emerald-400 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </Card>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}

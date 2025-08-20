import { FolderKanban, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AddProjectModal } from "../modals/add-project-modal";
import type { Project } from "@shared/schema";

export function ProjectManagementWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-dashboard-green bg-dashboard-green/20';
      case 'in-progress':
        return 'text-dashboard-indigo bg-dashboard-indigo/20';
      case 'planning':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'from-dashboard-green to-emerald-400';
    if (progress >= 50) return 'from-dashboard-indigo to-purple-400';
    if (progress >= 25) return 'from-yellow-400 to-orange-400';
    return 'from-gray-400 to-gray-500';
  };

  return (
    <>
      <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-project-management">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <FolderKanban className="text-dashboard-indigo mr-2" size={20} />
            Projects
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-indigo hover:text-indigo-300"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="button-add-project"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No projects yet. Start your first project!
            </div>
          ) : (
            projects.map((project) => (
              <div 
                key={project.id}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                data-testid={`project-${project.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{project.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ')}
                  </span>
                </div>
                {project.deadline && (
                  <p className="text-xs text-gray-400 mb-3">
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                )}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{project.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getProgressColor(project.progress || 0)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}

import { Music, Plus, Star, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { AddMusicModal } from "../modals/add-music-modal";
import type { MusicEntry } from "@shared/schema";

export function MusicTrackingWidget() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: musicEntries = [], isLoading } = useQuery<MusicEntry[]>({
    queryKey: ["/api/music"],
  });

  const deleteMusicMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/music/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music"] });
    },
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={12}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
      />
    ));
  };

  return (
    <>
      <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-music-tracking">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Music className="text-dashboard-purple mr-2" size={20} />
            Music Log
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-dashboard-purple hover:text-purple-300"
            onClick={() => setIsAddModalOpen(true)}
            data-testid="button-add-music"
          >
            <Plus size={18} />
          </Button>
        </div>
        
        <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
          {isLoading ? (
            <div className="text-center text-gray-400 py-4">Loading...</div>
          ) : musicEntries.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              No music entries yet. Add your first album!
            </div>
          ) : (
            musicEntries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors group"
                data-testid={`music-entry-${entry.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">
                      {entry.album}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{entry.artist}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(entry.listenedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-2">
                    <div className="flex items-center">
                      {renderStars(entry.rating)}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                      onClick={() => deleteMusicMutation.mutate(entry.id)}
                      data-testid={`button-delete-music-${entry.id}`}
                    >
                      <Trash2 size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <AddMusicModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
}

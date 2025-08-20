import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AddMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddMusicModal({ isOpen, onClose }: AddMusicModalProps) {
  const [formData, setFormData] = useState({
    artist: "",
    album: "",
    rating: 0,
    listenedDate: new Date().toISOString().split('T')[0]
  });

  const { toast } = useToast();

  const addMusicMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/music", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music"] });
      toast({
        title: "Music entry added",
        description: "Your music listening has been logged successfully.",
      });
      onClose();
      setFormData({
        artist: "",
        album: "",
        rating: 0,
        listenedDate: new Date().toISOString().split('T')[0]
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add music entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.artist && formData.album && formData.rating > 0) {
      addMusicMutation.mutate(formData);
    }
  };

  const setRating = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-white">Add Music Entry</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="artist" className="text-white">Artist</Label>
            <Input
              id="artist"
              value={formData.artist}
              onChange={(e) => setFormData(prev => ({ ...prev, artist: e.target.value }))}
              placeholder="Enter artist name"
              className="bg-input border-border text-white"
              data-testid="input-artist"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="album" className="text-white">Album</Label>
            <Input
              id="album"
              value={formData.album}
              onChange={(e) => setFormData(prev => ({ ...prev, album: e.target.value }))}
              placeholder="Enter album name"
              className="bg-input border-border text-white"
              data-testid="input-album"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Rating</Label>
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="p-1 hover:scale-110 transition-transform"
                  data-testid={`rating-star-${i + 1}`}
                >
                  <Star
                    size={24}
                    className={i < formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="listenedDate" className="text-white">Date Listened</Label>
            <Input
              id="listenedDate"
              type="date"
              value={formData.listenedDate}
              onChange={(e) => setFormData(prev => ({ ...prev, listenedDate: e.target.value }))}
              className="bg-input border-border text-white"
              data-testid="input-listened-date"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              data-testid="button-cancel-music"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={addMusicMutation.isPending || !formData.artist || !formData.album || formData.rating === 0}
              data-testid="button-save-music"
            >
              {addMusicMutation.isPending ? "Adding..." : "Add Music"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import { Rss, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RSSFeedWidget() {
  // Mock RSS data - in real app this would fetch from RSS feeds
  const rssItems = [
    {
      id: "1",
      title: "The Future of Web Development: Trends to Watch",
      source: "TechCrunch",
      timeAgo: "2h ago",
      excerpt: "Exploring the latest technologies and frameworks shaping modern web development..."
    },
    {
      id: "2", 
      title: "AI Integration in Everyday Apps",
      source: "Wired",
      timeAgo: "4h ago",
      excerpt: "How artificial intelligence is seamlessly integrated into the applications we use daily..."
    },
    {
      id: "3",
      title: "Design Systems at Scale",
      source: "Medium",
      timeAgo: "1d ago", 
      excerpt: "Best practices for implementing and maintaining design systems across large organizations..."
    }
  ];

  const handleRefresh = () => {
    // In real app, this would refresh the RSS feed
    console.log("Refreshing RSS feed");
  };

  return (
    <Card className="widget-card rounded-2xl p-6 animate-fade-in" data-testid="widget-rss-feed">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Rss className="text-dashboard-orange-500 mr-2" size={20} />
          RSS Feed
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="text-dashboard-orange-500 hover:text-orange-400"
          onClick={handleRefresh}
          data-testid="button-refresh-rss"
        >
          <RefreshCw size={18} />
        </Button>
      </div>
      
      <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin">
        {rssItems.map((item) => (
          <div 
            key={item.id}
            className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer"
            data-testid={`rss-item-${item.id}`}
          >
            <h4 className="font-medium text-white text-sm mb-1 line-clamp-2">
              {item.title}
            </h4>
            <p className="text-xs text-gray-400 mb-2">
              {item.source} • {item.timeAgo}
            </p>
            <p className="text-xs text-gray-300 line-clamp-2">
              {item.excerpt}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

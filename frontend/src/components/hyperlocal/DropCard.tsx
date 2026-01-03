import { drops } from '@/mocks/drops';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Flame, 
  Heart, 
  MessageCircle,
  Share2,
  TrendingUp,
  Zap,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

// Define the type for a single drop
export type Drop = typeof drops[0];

interface DropCardProps {
  drop: Drop;
}

const signalTypeConfig: Record<string, { color: string; icon: typeof Flame; label: string }> = {
  restock: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: TrendingUp, label: 'Restock' },
  drop: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Zap, label: 'Drop' },
  deal: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Tag, label: 'Deal' },
  sighting: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Flame, label: 'Sighting' },
};

const difficultyColors: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
};

const DropCard: React.FC<DropCardProps> = ({ drop }) => {
  const signalConfig = signalTypeConfig[drop.signalType] || signalTypeConfig.drop;
  const SignalIcon = signalConfig.icon;
  
  return (
    <div className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-orange-500/50 transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img 
          src={drop.image} 
          alt={drop.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge className={cn("text-xs font-medium", signalConfig.color)}>
            <SignalIcon className="h-3 w-3 mr-1" />
            {signalConfig.label}
          </Badge>
          
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm">
            <Flame className="h-3 w-3 text-orange-400" />
            <span className="text-xs font-bold text-white">{drop.heat_score}</span>
          </div>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm">
          <span className="text-lg font-bold text-white">${drop.price}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">{drop.retailer}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{drop.sku}</span>
          </div>
          <h3 className="font-semibold text-base leading-tight line-clamp-1">{drop.name}</h3>
          <p className="text-sm text-muted-foreground">{drop.colorway}</p>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {drop.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(drop.time), { addSuffix: true })}
          </span>
          <span className={cn("font-medium capitalize", difficultyColors[drop.diffMeter])}>
            {drop.diffMeter}
          </span>
        </div>

        {/* User & engagement */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <img 
              src={drop.postedByAvatar} 
              alt={drop.postedBy}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs font-medium">{drop.postedBy}</span>
          </div>
          
          <div className="flex items-center gap-3 text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{drop.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{drop.comments}</span>
            </button>
            <button className="hover:text-green-400 transition-colors" title="Share">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropCard;

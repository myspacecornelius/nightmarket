import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Tag,
  CheckCircle,
  XCircle,
  Shield,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export type Drop = typeof drops[0];

interface DropCardProps {
  drop: Drop;
  onVerify?: (dropId: number, confirmed: boolean) => void;
}

const signalTypeConfig: Record<string, { color: string; icon: typeof Flame; label: string }> = {
  restock: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: TrendingUp, label: 'Restock' },
  drop: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: Zap, label: 'Drop' },
  deal: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Tag, label: 'Deal' },
  sighting: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Flame, label: 'Sighting' },
};

const statusConfig: Record<string, { color: string; bg: string; icon: typeof CheckCircle; label: string }> = {
  verified: { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, label: 'Verified' },
  pending: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: AlertCircle, label: 'Pending' },
  unverified: { color: 'text-gray-400', bg: 'bg-gray-500/10', icon: Shield, label: 'Unverified' },
  denied: { color: 'text-red-500', bg: 'bg-red-500/10', icon: XCircle, label: 'Denied' },
};

const difficultyColors: Record<string, string> = {
  easy: 'text-green-400',
  medium: 'text-yellow-400',
  hard: 'text-red-400',
};

const DropCard: React.FC<DropCardProps> = ({ drop, onVerify }) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [localVerifyCount, setLocalVerifyCount] = useState(drop.verifyCount);
  const [localDenyCount, setLocalDenyCount] = useState(drop.denyCount);
  const [showConfetti, setShowConfetti] = useState(false);

  const signalConfig = signalTypeConfig[drop.signalType] || signalTypeConfig.drop;
  const SignalIcon = signalConfig.icon;
  const status = statusConfig[drop.status] || statusConfig.unverified;
  const StatusIcon = status.icon;

  const handleVerify = (confirmed: boolean) => {
    if (hasVoted) return;
    setHasVoted(true);
    
    if (confirmed) {
      setLocalVerifyCount(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 800);
    } else {
      setLocalDenyCount(prev => prev + 1);
    }
    
    onVerify?.(drop.id, confirmed);
  };

  const verificationProgress = Math.min(localVerifyCount / 3, 1);
  
  return (
    <motion.div 
      className={cn(
        "group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative",
        drop.status === 'verified' && "border-green-500/30 ring-1 ring-green-500/20",
        drop.status === 'denied' && "border-red-500/30 opacity-70"
      )}
      whileHover={{ y: -2 }}
    >
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

        {/* User & Rep Score */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src={drop.postedByAvatar} 
                alt={drop.postedBy}
                className={cn(
                  "w-7 h-7 rounded-full ring-2 ring-offset-1 ring-offset-background",
                  drop.repScore >= 80 ? "ring-green-500" : drop.repScore >= 50 ? "ring-yellow-500" : "ring-gray-500"
                )}
              />
              {drop.repScore >= 80 && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium">{drop.postedBy}</span>
              <span className="text-[10px] text-muted-foreground">Rep: {drop.repScore}</span>
            </div>
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

        {/* Verification Section */}
        <div className="pt-3 border-t space-y-2">
          {/* Status & Progress */}
          <div className="flex items-center justify-between">
            <div className={cn("flex items-center gap-1.5 text-xs font-medium", status.color)}>
              <StatusIcon className="w-3.5 h-3.5" />
              {status.label}
              {localVerifyCount > 0 && (
                <span className="text-muted-foreground">• {localVerifyCount} confirmed</span>
              )}
            </div>
            {drop.status !== 'verified' && drop.status !== 'denied' && (
              <span className="text-[10px] text-muted-foreground">
                {3 - localVerifyCount} more to verify
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {drop.status !== 'denied' && (
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${verificationProgress * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          )}

          {/* Verify Buttons */}
          {!hasVoted && drop.status !== 'verified' && drop.status !== 'denied' && (
            <div className="flex gap-2 pt-1">
              <motion.button
                onClick={() => handleVerify(true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-green-500/10 text-green-500 text-xs font-medium hover:bg-green-500/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Confirm
              </motion.button>
              <motion.button
                onClick={() => handleVerify(false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <XCircle className="w-3.5 h-3.5" />
                Deny
              </motion.button>
            </div>
          )}

          {hasVoted && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs text-muted-foreground py-1"
            >
              Thanks for verifying! +10 LACES
            </motion.div>
          )}
        </div>

        {/* Confetti Effect */}
        <AnimatePresence>
          {showConfetti && (
            <motion.div 
              className="absolute inset-0 pointer-events-none overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    bottom: '30%',
                    backgroundColor: ['#22c55e', '#eab308', '#3b82f6', '#f97316'][i % 4]
                  }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ 
                    y: -80 - Math.random() * 40,
                    x: (Math.random() - 0.5) * 60,
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DropCard;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, ArrowRightLeft, Users, Flame, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PulseEvent {
  id: string;
  type: 'verification' | 'trade' | 'crew' | 'heatmap' | 'signal';
  title: string;
  description: string;
  timestamp: Date;
}

const mockEvents: PulseEvent[] = [
  { id: '1', type: 'verification', title: '@sneaker_mike verified', description: 'Jordan 4 drop in SoHo', timestamp: new Date(Date.now() - 30000) },
  { id: '2', type: 'trade', title: 'Trade completed', description: '@alex ↔ @sam', timestamp: new Date(Date.now() - 90000) },
  { id: '3', type: 'crew', title: 'New crew formed', description: '"Brooklyn Heat"', timestamp: new Date(Date.now() - 180000) },
  { id: '4', type: 'heatmap', title: '🔥 Heatmap spike', description: 'Union Square +47%', timestamp: new Date(Date.now() - 300000) },
  { id: '5', type: 'signal', title: 'New signal posted', description: 'Dunk restock at Kith', timestamp: new Date(Date.now() - 420000) }
];

const eventIcons = { verification: CheckCircle, trade: ArrowRightLeft, crew: Users, heatmap: Flame, signal: MapPin };
const eventColors = {
  verification: 'text-green-500 bg-green-500/10',
  trade: 'text-blue-500 bg-blue-500/10',
  crew: 'text-purple-500 bg-purple-500/10',
  heatmap: 'text-orange-500 bg-orange-500/10',
  signal: 'text-yellow-500 bg-yellow-500/10'
};

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

export const LivePulse: React.FC<{ className?: string }> = ({ className }) => {
  const [events, setEvents] = useState<PulseEvent[]>(mockEvents);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      const types: PulseEvent['type'][] = ['verification', 'trade', 'signal', 'heatmap'];
      const titles = ['@user verified signal', 'Trade completed', 'New signal posted', '🔥 Activity spike'];
      const descs = ['Downtown drop', '@a ↔ @b', 'Restock alert', 'Times Square +23%'];
      const i = Math.floor(Math.random() * 4);
      setEvents(prev => [{ id: Date.now().toString(), type: types[i], title: titles[i], description: descs[i], timestamp: new Date() }, ...prev].slice(0, 10));
    }, 8000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className={cn("flex flex-col bg-card border rounded-xl overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold text-sm">Live Pulse</span>
        </div>
        <button onClick={() => setIsLive(!isLive)} className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium", isLive ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-400")}>
          <span className={cn("w-1.5 h-1.5 rounded-full", isLive ? "bg-green-500 animate-pulse" : "bg-gray-400")} />
          {isLive ? 'Live' : 'Paused'}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const Icon = eventIcons[event.type];
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                className="px-4 py-3 border-b last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-1.5 rounded-lg", eventColors[event.type])}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{event.description}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{formatTimeAgo(event.timestamp)}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LivePulse;

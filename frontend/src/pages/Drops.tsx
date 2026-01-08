import { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isToday,
  parseISO
} from 'date-fns';
import WarRoomPane from '@/components/hyperlocal/WarRoomPane';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  Flame,
  Bell,
  ExternalLink,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock drop data
const mockDrops = [
  {
    id: '1',
    name: 'Air Jordan 4 Retro "Bred Reimagined"',
    brand: 'Jordan',
    date: '2026-01-10',
    time: '10:00 AM EST',
    price: 215,
    retailer: 'SNKRS',
    difficulty: 'hard',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    hype: 98,
  },
  {
    id: '2',
    name: 'Yeezy Boost 350 V2 "Onyx"',
    brand: 'Adidas',
    date: '2026-01-10',
    time: '7:00 AM EST',
    price: 230,
    retailer: 'Confirmed',
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
    hype: 85,
  },
  {
    id: '3',
    name: 'New Balance 990v6 "Grey"',
    brand: 'New Balance',
    date: '2026-01-15',
    time: '10:00 AM EST',
    price: 199,
    retailer: 'New Balance',
    difficulty: 'easy',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop',
    hype: 72,
  },
  {
    id: '4',
    name: 'Nike Dunk Low "Panda" Restock',
    brand: 'Nike',
    date: '2026-01-18',
    time: '10:00 AM EST',
    price: 115,
    retailer: 'SNKRS',
    difficulty: 'medium',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
    hype: 78,
  },
  {
    id: '5',
    name: 'Travis Scott x Jordan 1 Low "Olive"',
    brand: 'Jordan',
    date: '2026-01-25',
    time: '10:00 AM EST',
    price: 150,
    retailer: 'SNKRS',
    difficulty: 'impossible',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&h=200&fit=crop',
    hype: 99,
  },
];

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  hard: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  impossible: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const Drops = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the beginning of the month
  const startDay = monthStart.getDay();
  const paddedDays = [...Array(startDay).fill(null), ...days];

  const getDropsForDate = (date: Date) => {
    return mockDrops.filter(drop => isSameDay(parseISO(drop.date), date));
  };

  const selectedDrops = selectedDate ? getDropsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            Upcoming Drops
          </h1>
          <p className="text-muted-foreground text-sm">Never miss a release. Community-curated drop calendar.</p>
        </div>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Set Alerts
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {format(currentMonth, 'MMMM yyyy')}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Today
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {paddedDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }
                
                const drops = getDropsForDate(day);
                const hasDrops = drops.length > 0;
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={cn(
                      "aspect-square rounded-lg flex flex-col items-center justify-center relative transition-all",
                      "hover:bg-accent",
                      !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                      isToday(day) && "ring-2 ring-primary",
                      isSelected && "bg-primary text-primary-foreground",
                      hasDrops && !isSelected && "bg-orange-500/10"
                    )}
                  >
                    <span className="text-sm font-medium">{format(day, 'd')}</span>
                    {hasDrops && (
                      <div className="flex gap-0.5 mt-0.5">
                        {drops.slice(0, 3).map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "w-1.5 h-1.5 rounded-full",
                              isSelected ? "bg-primary-foreground" : "bg-orange-500"
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* War Room / Live Drop */}
        <WarRoomPane />
      </div>

      {/* Selected Date Drops */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedDrops.length > 0 
                ? `${selectedDrops.length} Drop${selectedDrops.length > 1 ? 's' : ''} on ${format(selectedDate, 'MMMM d, yyyy')}`
                : `No drops scheduled for ${format(selectedDate, 'MMMM d, yyyy')}`
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDrops.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {selectedDrops.map(drop => (
                  <div 
                    key={drop.id}
                    className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <img 
                      src={drop.image} 
                      alt={drop.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">{drop.brand}</p>
                          <h3 className="font-semibold text-sm line-clamp-2">{drop.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-orange-400">
                          <Flame className="h-3 w-3" />
                          <span className="text-xs font-bold">{drop.hype}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {drop.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {drop.retailer}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">${drop.price}</span>
                        <Badge variant="outline" className={cn("text-xs", difficultyColors[drop.difficulty])}>
                          {drop.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No drops scheduled for this date</p>
                <p className="text-sm">Check back later or browse upcoming releases</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* All Upcoming Drops */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            All Upcoming Drops
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockDrops.map(drop => (
              <div 
                key={drop.id}
                className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <img 
                  src={drop.image} 
                  alt={drop.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{drop.brand}</span>
                    <Badge variant="outline" className={cn("text-xs", difficultyColors[drop.difficulty])}>
                      {drop.difficulty}
                    </Badge>
                  </div>
                  <h3 className="font-semibold truncate">{drop.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{format(parseISO(drop.date), 'MMM d')} @ {drop.time}</span>
                    <span>{drop.retailer}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-orange-400 justify-end">
                    <Flame className="h-4 w-4" />
                    <span className="font-bold">{drop.hype}</span>
                  </div>
                  <span className="font-bold text-lg">${drop.price}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Drops;

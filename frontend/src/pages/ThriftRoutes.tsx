import { useState } from 'react';
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Clock, 
  Star, 
  Navigation,
  ThumbsUp,
  MessageCircle,
  Share2,
  Plus,
  TrendingUp,
  Store,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock thrift route data
const mockRoutes = [
  {
    id: '1',
    name: 'Boston Vintage Loop',
    description: 'Hit the best consignment shops in Back Bay and South End. Great for vintage Jordans and rare New Balance.',
    author: 'SneakerHunterBOS',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=boston',
    city: 'Boston',
    stops: [
      { name: 'Bobby From Boston', type: 'vintage', rating: 4.8 },
      { name: 'Goodwill Back Bay', type: 'thrift', rating: 4.2 },
      { name: 'Plato\'s Closet Brookline', type: 'consignment', rating: 4.5 },
      { name: 'Buffalo Exchange', type: 'consignment', rating: 4.3 },
    ],
    duration: '3-4 hours',
    difficulty: 'easy',
    successRate: 78,
    likes: 234,
    comments: 45,
    bestFinds: ['Jordan 4 Fire Red DS - $45', 'NB 990v3 - $28', 'Vintage Nike ACG - $35'],
    tags: ['vintage', 'jordan', 'new-balance'],
  },
  {
    id: '2',
    name: 'NYC Thrift Marathon',
    description: 'Full day route covering Manhattan and Brooklyn. Warning: bring cash and comfortable shoes!',
    author: 'NYCKicksKing',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nyc',
    city: 'New York',
    stops: [
      { name: 'L Train Vintage', type: 'vintage', rating: 4.7 },
      { name: 'Beacon\'s Closet', type: 'consignment', rating: 4.6 },
      { name: 'Housing Works', type: 'thrift', rating: 4.4 },
      { name: 'Salvation Army Chelsea', type: 'thrift', rating: 4.0 },
      { name: 'The Vintage Twin', type: 'vintage', rating: 4.8 },
    ],
    duration: '6-8 hours',
    difficulty: 'hard',
    successRate: 85,
    likes: 567,
    comments: 89,
    bestFinds: ['Off-White Presto - $120', 'Yeezy 700 - $95', 'Vintage Dunk High - $55'],
    tags: ['marathon', 'all-day', 'grails'],
  },
  {
    id: '3',
    name: 'LA Sneaker Safari',
    description: 'West side consignment crawl. Best for hype and designer sneakers at steep discounts.',
    author: 'LALacedUp',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=la',
    city: 'Los Angeles',
    stops: [
      { name: 'Round Two LA', type: 'consignment', rating: 4.9 },
      { name: 'Crossroads Trading', type: 'consignment', rating: 4.3 },
      { name: 'Wasteland', type: 'vintage', rating: 4.5 },
    ],
    duration: '2-3 hours',
    difficulty: 'medium',
    successRate: 72,
    likes: 189,
    comments: 32,
    bestFinds: ['Travis Scott AF1 - $180', 'Sacai Waffle - $85'],
    tags: ['hype', 'consignment', 'quick'],
  },
  {
    id: '4',
    name: 'Chicago Heat Check',
    description: 'South Loop to Wicker Park route. Heavy on vintage Nike and Bulls memorabilia.',
    author: 'ChiTownSole',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chi',
    city: 'Chicago',
    stops: [
      { name: 'Knee Deep Vintage', type: 'vintage', rating: 4.7 },
      { name: 'Kokorokoko', type: 'vintage', rating: 4.6 },
      { name: 'Village Discount Outlet', type: 'thrift', rating: 4.1 },
      { name: 'Unique Thrift', type: 'thrift', rating: 4.0 },
    ],
    duration: '4-5 hours',
    difficulty: 'medium',
    successRate: 81,
    likes: 312,
    comments: 56,
    bestFinds: ['Jordan 11 Bred - $65', 'Vintage Bulls Windbreaker + Dunks - $40'],
    tags: ['vintage', 'nike', 'bulls'],
  },
];

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  hard: 'bg-red-500/20 text-red-400',
};

const stopTypeColors: Record<string, string> = {
  vintage: 'bg-purple-500/20 text-purple-400',
  thrift: 'bg-blue-500/20 text-blue-400',
  consignment: 'bg-orange-500/20 text-orange-400',
};

const ThriftRoutes = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = [...new Set(mockRoutes.map(r => r.city))];
  
  const filteredRoutes = mockRoutes.filter(route => {
    if (selectedCity && route.city !== selectedCity) return false;
    if (searchQuery && !route.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Navigation className="h-6 w-6 text-purple-500" />
            ThriftRoutes
          </h1>
          <p className="text-muted-foreground text-sm">Community-curated thrift store routes to find hidden gems</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Share Route
        </Button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Navigation className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockRoutes.length}</p>
              <p className="text-xs text-muted-foreground">Active Routes</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Store className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">16</p>
              <p className="text-xs text-muted-foreground">Total Stops</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">$2.4k</p>
              <p className="text-xs text-muted-foreground">Avg Savings</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <TrendingUp className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">79%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Input 
          placeholder="Search routes..." 
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-2">
          <Button 
            variant={selectedCity === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedCity(null)}
          >
            All Cities
          </Button>
          {cities.map(city => (
            <Button
              key={city}
              variant={selectedCity === city ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCity(city)}
            >
              <MapPin className="h-3 w-3 mr-1" />
              {city}
            </Button>
          ))}
        </div>
      </div>

      {/* Routes List */}
      <div className="grid gap-6">
        {filteredRoutes.map(route => (
          <Card key={route.id} className="overflow-hidden hover:border-purple-500/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={route.authorAvatar} 
                    alt={route.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">{route.name}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>by {route.author}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {route.city}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs", difficultyColors[route.difficulty])}>
                    {route.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {route.duration}
                  </Badge>
                </div>
              </div>
              <CardDescription className="mt-2">{route.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Stops */}
              <div>
                <p className="text-sm font-medium mb-2">Stops ({route.stops.length})</p>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map((stop, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm"
                    >
                      <span className={cn("w-2 h-2 rounded-full", stopTypeColors[stop.type].replace('text-', 'bg-').replace('/20', ''))} />
                      <span>{stop.name}</span>
                      <span className="flex items-center gap-0.5 text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        {stop.rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Finds */}
              <div>
                <p className="text-sm font-medium mb-2">Best Community Finds</p>
                <div className="flex flex-wrap gap-2">
                  {route.bestFinds.map((find, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      🔥 {find}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-400">{route.successRate}%</span> success
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {route.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {route.comments}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button size="sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    Start Route
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ThriftRoutes

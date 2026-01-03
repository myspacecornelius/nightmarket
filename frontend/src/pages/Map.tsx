import { useState, useCallback } from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { BaseMap } from '@/components/map/BaseMap';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  MapPin, 
  Flame, 
  TrendingUp, 
  Users, 
  Zap,
  Locate,
  Layers
} from 'lucide-react';

// Fix Leaflet default marker icons
import 'leaflet/dist/leaflet.css';

// Custom marker icons
const createCustomIcon = (color: string, size: number = 32) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
  });
};

// Mock signal data for the map
const mockSignals = [
  { id: 1, lat: 42.3601, lng: -71.0589, type: 'restock', title: 'Jordan 4 Restock', store: 'Foot Locker Boston', heat: 92 },
  { id: 2, lat: 42.3505, lng: -71.0775, type: 'drop', title: 'Yeezy 350 V2', store: 'Concepts', heat: 88 },
  { id: 3, lat: 42.3662, lng: -71.0621, type: 'deal', title: 'Nike Dunk Low 40% Off', store: 'Nike Newbury', heat: 75 },
  { id: 4, lat: 42.3554, lng: -71.0640, type: 'sighting', title: 'Travis Scott J1 Low', store: 'Street Sighting', heat: 95 },
  { id: 5, lat: 40.7580, lng: -73.9855, type: 'restock', title: 'Air Max 1 Patta', store: 'Kith NYC', heat: 89 },
  { id: 6, lat: 40.7214, lng: -73.9969, type: 'drop', title: 'New Balance 990v6', store: 'Aimé Leon Dore', heat: 91 },
  { id: 7, lat: 34.0407, lng: -118.2468, type: 'deal', title: 'Adidas Forum 50% Off', store: 'Adidas LA', heat: 70 },
  { id: 8, lat: 41.8827, lng: -87.6233, type: 'sighting', title: 'Off-White x Nike', store: 'Notre Chicago', heat: 97 },
];

const signalColors: Record<string, string> = {
  restock: '#22c55e',
  drop: '#f59e0b',
  deal: '#3b82f6',
  sighting: '#ef4444',
};

const signalIcons: Record<string, typeof Flame> = {
  restock: TrendingUp,
  drop: Zap,
  deal: MapPin,
  sighting: Flame,
};

const Map = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleLocate = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.warn("Location error:", error)
      );
    }
  }, []);

  const filteredSignals = selectedFilter 
    ? mockSignals.filter(s => s.type === selectedFilter)
    : mockSignals;

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            Hyperlocal Heatmap
          </h1>
          <p className="text-muted-foreground text-sm">Real-time sneaker signals from your community</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <Users className="h-3 w-3" />
            {mockSignals.length} signals
          </Badge>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button 
          variant={selectedFilter === null ? "default" : "outline"} 
          size="sm"
          onClick={() => setSelectedFilter(null)}
        >
          <Layers className="h-4 w-4 mr-1" />
          All
        </Button>
        {Object.entries(signalColors).map(([type, color]) => {
          const Icon = signalIcons[type];
          return (
            <Button
              key={type}
              variant={selectedFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(type)}
              className="capitalize"
            >
              <Icon className="h-4 w-4 mr-1" style={{ color: selectedFilter === type ? 'white' : color }} />
              {type}
            </Button>
          );
        })}
        <div className="flex-1" />
        <Button variant="outline" size="sm" onClick={handleLocate}>
          <Locate className="h-4 w-4 mr-1" />
          My Location
        </Button>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-lg overflow-hidden border">
        <BaseMap 
          center={[42.3601, -71.0589]} 
          zoom={13}
          enableGeolocation={false}
        >
          {/* Signal markers */}
          {filteredSignals.map((signal) => (
            <Marker
              key={signal.id}
              position={[signal.lat, signal.lng]}
              icon={createCustomIcon(signalColors[signal.type])}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge 
                      className="capitalize text-white"
                      style={{ backgroundColor: signalColors[signal.type] }}
                    >
                      {signal.type}
                    </Badge>
                    <span className="text-xs text-orange-400 font-semibold flex items-center">
                      <Flame className="h-3 w-3 mr-1" />
                      {signal.heat}% heat
                    </span>
                  </div>
                  <h3 className="font-bold text-sm">{signal.title}</h3>
                  <p className="text-xs text-stone-400">{signal.store}</p>
                  <Button size="sm" className="w-full mt-2">View Details</Button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Heat circles for high-activity areas */}
          {filteredSignals.filter(s => s.heat > 85).map((signal) => (
            <Circle
              key={`heat-${signal.id}`}
              center={[signal.lat, signal.lng]}
              radius={300}
              pathOptions={{
                color: signalColors[signal.type],
                fillColor: signalColors[signal.type],
                fillOpacity: 0.15,
                weight: 1,
              }}
            />
          ))}

          {/* User location marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={L.divIcon({
                className: 'user-marker',
                html: `<div style="
                  background: #3b82f6;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 0 0 8px rgba(59,130,246,0.3);
                "></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
              })}
            />
          )}
        </BaseMap>
      </div>

      {/* Legend */}
      <Card className="p-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            {Object.entries(signalColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color }}
                />
                <span className="capitalize text-muted-foreground">{type}</span>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground">
            Last updated: Just now
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Map;

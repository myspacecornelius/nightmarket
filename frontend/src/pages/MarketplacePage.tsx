import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Heart, MapPin, CheckCircle, XCircle, Shield } from 'lucide-react';
import { apiClient, type Listing, type HyperlocalFeedResponse } from '@/lib/api-client';
import { LivePulse } from '@/components/community/LivePulse';
import { cn } from '@/lib/utils';

type VerificationStatus = 'verified' | 'pending' | 'unverified';

const generateMockVerification = (index: number) => ({
  status: (['verified', 'pending', 'unverified'] as VerificationStatus[])[index % 3],
  verifyCount: Math.floor(Math.random() * 8),
  repScore: 50 + Math.floor(Math.random() * 50),
  sellerAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=seller${index}`,
  sellerName: ['SneakerKing', 'KicksDealer', 'HeatCollector', 'SoleTrader', 'DripsOnly'][index % 5],
});

const DEFAULT_LOCATION = { lat: 42.3505, lng: -71.0763 };

// Fallback sneaker images for demo when API doesn't return images
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=400&fit=crop',
];

const getListingImage = (_listing: Listing, index: number): string => {
  // Always use fallback images - API image paths don't resolve in dev mode
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
};

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'DS', label: 'Deadstock' },
  { id: 'VNDS', label: 'VNDS' },
  { id: 'used', label: 'Used' },
];

export function MarketplacePage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location] = useState(DEFAULT_LOCATION);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const condition = activeTab === 'all' ? undefined : 
                       activeTab === 'used' ? 'GOOD' : activeTab;
      
      const response: HyperlocalFeedResponse = await apiClient.getHyperlocalListings({
        lat: location.lat,
        lng: location.lng,
        radius: 3,
        condition,
        sort_by: 'newest',
        limit: 50,
      });
      
      setListings(response.listings);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Unable to load listings');
    } finally {
      setIsLoading(false);
    }
  }, [location, activeTab]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const filteredListings = listings.filter((listing) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return listing.title.toLowerCase().includes(q) || listing.brand.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-3xl mx-auto px-4">
          {/* Search */}
          <div className="py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search sneakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-12 rounded-xl text-base transition-shadow focus:outline-none focus:ring-2 focus:ring-primary/20 bg-muted border border-border text-foreground"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 pb-4">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-foreground text-background" 
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-border border-t-transparent animate-spin" />
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={fetchListings}
              className="mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && filteredListings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-muted">
              <span className="text-4xl">👟</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-foreground">No sneakers found</h3>
            <p className="text-sm text-muted-foreground">Try a different search or filter</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && !error && filteredListings.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {filteredListings.map((listing, index) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                imageUrl={getListingImage(listing, index)}
                onClick={() => navigate(`/marketplace/${listing.id}`)}
                verification={generateMockVerification(index)}
              />
            ))}
          </div>
        )}
      </main>
      </div>

      {/* Live Pulse Sidebar */}
      <div className="hidden xl:block w-80 flex-shrink-0 p-6">
        <div className="sticky top-6">
          <LivePulse />
        </div>
      </div>
    </div>
  );
}

interface ListingVerification {
  status: VerificationStatus;
  verifyCount: number;
  repScore: number;
  sellerAvatar: string;
  sellerName: string;
}

function ListingCard({ listing, imageUrl, onClick, verification }: { 
  listing: Listing; 
  imageUrl: string; 
  onClick: () => void;
  verification: ListingVerification;
}) {
  const [saved, setSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [localVerifyCount, setLocalVerifyCount] = useState(verification.verifyCount);
  const [showConfetti, setShowConfetti] = useState(false);

  const price = listing.price ? `$${listing.price.toLocaleString()}` : 'Offer';

  const statusConfig = {
    verified: { color: 'text-green-500', bg: 'bg-green-500/10', icon: CheckCircle, label: 'Verified' },
    pending: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: Shield, label: 'Pending' },
    unverified: { color: 'text-gray-400', bg: 'bg-gray-500/10', icon: Shield, label: 'Unverified' },
  };

  const status = statusConfig[verification.status];
  const StatusIcon = status.icon;
  const verificationProgress = Math.min(localVerifyCount / 3, 1);

  const handleVerify = (e: React.MouseEvent, confirmed: boolean) => {
    e.stopPropagation();
    if (hasVoted) return;
    setHasVoted(true);
    if (confirmed) {
      setLocalVerifyCount(prev => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 800);
    }
  };

  return (
    <motion.article 
      onClick={onClick}
      className={cn(
        "group cursor-pointer rounded-xl overflow-hidden transition-shadow hover:shadow-lg relative bg-card border border-border",
        verification.status === 'verified' && "ring-1 ring-green-500/30"
      )}
      whileHover={{ y: -2 }}
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-border" />}
        <img
          src={imageUrl}
          alt={listing.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />
        
        {/* Save Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          className={cn(
            "absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm",
            saved ? "bg-red-500" : "bg-white/90"
          )}
          aria-label="Save listing"
        >
          <Heart 
            className={cn("h-4 w-4", saved ? "text-white" : "text-muted-foreground")}
            fill={saved ? 'currentColor' : 'none'}
          />
        </button>

        {/* Condition Badge */}
        <div 
          className={cn(
            "absolute bottom-3 left-3 px-2 py-1 rounded-md text-xs font-medium shadow-sm",
            listing.condition === 'DS' ? "bg-green-500 text-white" : "bg-white/90 text-foreground"
          )}
        >
          {listing.condition}
        </div>

        {/* Verification Status Badge */}
        <div className={cn("absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1", status.bg, status.color)}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm truncate text-foreground">
          {listing.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Size {listing.size}
          </span>
          <span className="font-semibold text-sm text-foreground">
            {price}
          </span>
        </div>

        {/* Seller with Rep Score */}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <img 
            src={verification.sellerAvatar}
            alt={verification.sellerName}
            className={cn(
              "w-6 h-6 rounded-full ring-2 ring-offset-1",
              verification.repScore >= 80 ? "ring-green-500" : verification.repScore >= 50 ? "ring-yellow-500" : "ring-gray-300"
            )}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate text-foreground">{verification.sellerName}</p>
            <p className="text-[10px] text-muted-foreground">Rep: {verification.repScore}</p>
          </div>
          {listing.distance_miles && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                {listing.distance_miles.toFixed(1)}mi
              </span>
            </div>
          )}
        </div>

        {/* Verification Progress */}
        {verification.status !== 'verified' && (
          <div className="space-y-1.5">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                initial={{ width: 0 }}
                animate={{ width: `${verificationProgress * 100}%` }}
              />
            </div>
            
            {!hasVoted && (
              <div className="flex gap-1.5">
                <motion.button
                  onClick={(e) => handleVerify(e, true)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-green-500/10 text-green-600 text-[10px] font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircle className="w-3 h-3" />
                  Verify
                </motion.button>
                <motion.button
                  onClick={(e) => handleVerify(e, false)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md bg-red-500/10 text-red-500 text-[10px] font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle className="w-3 h-3" />
                  Flag
                </motion.button>
              </div>
            )}
            
            {hasVoted && (
              <p className="text-center text-[10px] text-gray-400 py-1">+10 LACES earned</p>
            )}
          </div>
        )}
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div className="absolute inset-0 pointer-events-none overflow-hidden" exit={{ opacity: 0 }}>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "absolute w-2 h-2 rounded-full",
                  i % 3 === 0 ? "bg-green-500" : i % 3 === 1 ? "bg-yellow-500" : "bg-blue-500"
                )}
                initial={{ y: 0, opacity: 1, left: '50%', bottom: '40%' }}
                animate={{ y: -60, x: (i - 3) * 15, opacity: 0, scale: 0 }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default MarketplacePage;

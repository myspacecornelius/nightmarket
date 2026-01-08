import type { Crew, CrewActivity } from '@/types/crew';

export const mockCrews: Crew[] = [
  {
    id: 'crew-001',
    name: 'Brooklyn Heat',
    tag: 'BKH',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=brooklynheat',
    banner: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=300&fit=crop',
    description: 'Dominating the Brooklyn sneaker scene since 2024. We verify fast, trade fair.',
    createdAt: '2024-06-15T00:00:00Z',
    leader: {
      id: 'u1', username: 'BK_Legend', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bklegend',
      role: 'leader', repScore: 98, joinedAt: '2024-06-15T00:00:00Z', isOnline: true, lacesContributed: 12500
    },
    members: [
      { id: 'u2', username: 'SneakerKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=king', role: 'officer', repScore: 92, joinedAt: '2024-06-20T00:00:00Z', isOnline: true, lacesContributed: 8200 },
      { id: 'u3', username: 'HeatHunter', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hunter', role: 'officer', repScore: 89, joinedAt: '2024-07-01T00:00:00Z', isOnline: false, lacesContributed: 6800 },
      { id: 'u4', username: 'DunkMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dunk', role: 'member', repScore: 78, joinedAt: '2024-08-15T00:00:00Z', isOnline: true, lacesContributed: 3200 },
    ],
    memberCount: 8,
    maxMembers: 12,
    territory: {
      id: 't1', name: 'Williamsburg', bounds: { north: 40.72, south: 40.70, east: -73.94, west: -73.97 },
      center: { lat: 40.71, lng: -73.955 }, activityScore: 94, claimedAt: '2024-07-01T00:00:00Z', dominance: 87
    },
    stats: { totalLaces: 45200, weeklyLaces: 3400, rank: 1, verifiedSignals: 234, tradesCompleted: 89, winStreak: 12 },
    isPublic: true, requiresApproval: true, tags: ['brooklyn', 'competitive', 'active'], color: '#ef4444'
  },
  {
    id: 'crew-002',
    name: 'SoHo Saints',
    tag: 'SHS',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=sohosaints',
    banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=300&fit=crop',
    description: 'Manhattan\'s finest. Luxury drops and exclusive trades only.',
    createdAt: '2024-05-01T00:00:00Z',
    leader: {
      id: 'u5', username: 'SoHo_Elite', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elite',
      role: 'leader', repScore: 96, joinedAt: '2024-05-01T00:00:00Z', isOnline: false, lacesContributed: 15800
    },
    members: [
      { id: 'u6', username: 'LuxKicks', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lux', role: 'officer', repScore: 94, joinedAt: '2024-05-10T00:00:00Z', isOnline: true, lacesContributed: 9400 },
      { id: 'u7', username: 'HighEnd', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=high', role: 'member', repScore: 85, joinedAt: '2024-06-01T00:00:00Z', isOnline: true, lacesContributed: 5200 },
    ],
    memberCount: 6,
    maxMembers: 12,
    territory: {
      id: 't2', name: 'SoHo', bounds: { north: 40.73, south: 40.72, east: -73.99, west: -74.01 },
      center: { lat: 40.725, lng: -74.00 }, activityScore: 88, claimedAt: '2024-05-15T00:00:00Z', dominance: 92
    },
    stats: { totalLaces: 42100, weeklyLaces: 2800, rank: 2, verifiedSignals: 198, tradesCompleted: 112, winStreak: 8 },
    isPublic: false, requiresApproval: true, tags: ['manhattan', 'luxury', 'exclusive'], color: '#8b5cf6'
  },
  {
    id: 'crew-003',
    name: 'Queens Collective',
    tag: 'QC',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=queenscollective',
    description: 'United we hunt, together we thrive. Queens represent!',
    createdAt: '2024-08-01T00:00:00Z',
    leader: {
      id: 'u8', username: 'QueensKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=qk',
      role: 'leader', repScore: 88, joinedAt: '2024-08-01T00:00:00Z', isOnline: true, lacesContributed: 7200
    },
    members: [
      { id: 'u9', username: 'Astoria_Heat', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=astoria', role: 'officer', repScore: 82, joinedAt: '2024-08-05T00:00:00Z', isOnline: false, lacesContributed: 4100 },
    ],
    memberCount: 5,
    maxMembers: 12,
    territory: {
      id: 't3', name: 'Astoria', bounds: { north: 40.78, south: 40.76, east: -73.91, west: -73.94 },
      center: { lat: 40.77, lng: -73.92 }, activityScore: 72, claimedAt: '2024-08-10T00:00:00Z', dominance: 65
    },
    stats: { totalLaces: 18500, weeklyLaces: 1900, rank: 5, verifiedSignals: 87, tradesCompleted: 45, winStreak: 3 },
    isPublic: true, requiresApproval: false, tags: ['queens', 'friendly', 'growing'], color: '#22c55e'
  },
  {
    id: 'crew-004',
    name: 'Bronx Runners',
    tag: 'BXR',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=bronxrunners',
    description: 'Fast feet, faster verifications. The Bronx is burning.',
    createdAt: '2024-09-01T00:00:00Z',
    leader: {
      id: 'u10', username: 'BX_Flash', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=flash',
      role: 'leader', repScore: 85, joinedAt: '2024-09-01T00:00:00Z', isOnline: true, lacesContributed: 5400
    },
    members: [],
    memberCount: 4,
    maxMembers: 12,
    stats: { totalLaces: 12800, weeklyLaces: 2200, rank: 8, verifiedSignals: 56, tradesCompleted: 28, winStreak: 5 },
    isPublic: true, requiresApproval: false, tags: ['bronx', 'speed', 'rising'], color: '#f59e0b'
  }
];

export const mockCrewActivity: CrewActivity[] = [
  { id: 'a1', type: 'signal_verified', description: 'Verified Jordan 4 drop at Nike SoHo', actor: mockCrews[0].members[0], timestamp: new Date(Date.now() - 5 * 60000).toISOString(), lacesEarned: 25 },
  { id: 'a2', type: 'trade_completed', description: 'Trade with @alex completed', actor: mockCrews[0].leader, timestamp: new Date(Date.now() - 15 * 60000).toISOString(), lacesEarned: 50 },
  { id: 'a3', type: 'member_joined', description: '@NewMember joined the crew', actor: mockCrews[0].members[1], timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
  { id: 'a4', type: 'territory_claimed', description: 'Claimed Williamsburg territory', actor: mockCrews[0].leader, timestamp: new Date(Date.now() - 60 * 60000).toISOString(), lacesEarned: 500 },
  { id: 'a5', type: 'rank_up', description: 'Crew ranked up to #1', actor: mockCrews[0].leader, timestamp: new Date(Date.now() - 120 * 60000).toISOString(), lacesEarned: 1000 },
];

export const unclaimedTerritories = [
  { id: 'ut1', name: 'Lower East Side', center: { lat: 40.715, lng: -73.985 }, activityScore: 68, requiredLaces: 2000 },
  { id: 'ut2', name: 'Midtown', center: { lat: 40.755, lng: -73.985 }, activityScore: 82, requiredLaces: 3500 },
  { id: 'ut3', name: 'Harlem', center: { lat: 40.81, lng: -73.95 }, activityScore: 54, requiredLaces: 1500 },
  { id: 'ut4', name: 'Jersey City', center: { lat: 40.72, lng: -74.04 }, activityScore: 45, requiredLaces: 1000 },
];

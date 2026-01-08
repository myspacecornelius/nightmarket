export interface CrewMember {
  id: string;
  username: string;
  avatar: string;
  role: 'leader' | 'officer' | 'member';
  repScore: number;
  joinedAt: string;
  isOnline: boolean;
  lacesContributed: number;
}

export interface CrewTerritory {
  id: string;
  name: string;
  bounds: { north: number; south: number; east: number; west: number };
  center: { lat: number; lng: number };
  activityScore: number;
  claimedAt: string;
  dominance: number;
}

export interface Crew {
  id: string;
  name: string;
  tag: string;
  avatar: string;
  banner?: string;
  description: string;
  createdAt: string;
  leader: CrewMember;
  members: CrewMember[];
  memberCount: number;
  maxMembers: number;
  territory?: CrewTerritory;
  stats: {
    totalLaces: number;
    weeklyLaces: number;
    rank: number;
    verifiedSignals: number;
    tradesCompleted: number;
    winStreak: number;
  };
  isPublic: boolean;
  requiresApproval: boolean;
  tags: string[];
  color: string;
}

export interface CrewActivity {
  id: string;
  type: 'signal_verified' | 'trade_completed' | 'member_joined' | 'laces_earned' | 'territory_claimed' | 'rank_up';
  description: string;
  actor: CrewMember;
  timestamp: string;
  lacesEarned?: number;
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Trophy, MapPin, Zap, Crown, Shield, ChevronRight, 
  Plus, Search, Target, TrendingUp, Star, Lock, Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCrews, mockCrewActivity, unclaimedTerritories } from '@/mocks/crews';
import type { Crew } from '@/types/crew';

export function CrewsPage() {
  const [activeTab, setActiveTab] = useState<'discover' | 'my-crew' | 'territories'>('discover');
  const [selectedCrew, setSelectedCrew] = useState<Crew | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const userCrew = mockCrews[0];
  const filteredCrews = mockCrews.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Crews</h1>
              <p className="text-sm text-muted-foreground">Join forces, claim territory, dominate</p>
            </div>
            <motion.button
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Create Crew
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-muted/50 p-1 rounded-lg w-fit">
            {[
              { id: 'discover', label: 'Discover', icon: Globe },
              { id: 'my-crew', label: 'My Crew', icon: Users },
              { id: 'territories', label: 'Territories', icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  activeTab === tab.id 
                    ? "bg-background text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Discover Tab */}
        {activeTab === 'discover' && (
          <div className="space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search crews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-muted/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Leaderboard Preview */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent border border-yellow-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold">Top Crews This Week</span>
                </div>
                <button className="text-sm text-primary flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {mockCrews.slice(0, 3).map((crew, i) => (
                  <div key={crew.id} className="flex items-center gap-3 bg-background/50 rounded-lg p-3 min-w-[200px]">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      i === 0 ? "bg-yellow-500 text-yellow-950" : 
                      i === 1 ? "bg-gray-300 text-gray-700" : "bg-amber-600 text-amber-50"
                    )}>
                      #{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{crew.name}</p>
                      <p className="text-xs text-muted-foreground">{crew.stats.weeklyLaces.toLocaleString()} LACES</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Crews Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredCrews.map((crew) => (
                <CrewCard key={crew.id} crew={crew} onClick={() => setSelectedCrew(crew)} />
              ))}
            </div>
          </div>
        )}

        {/* My Crew Tab */}
        {activeTab === 'my-crew' && (
          <div className="space-y-6">
            {/* Crew Header */}
            <div className="relative rounded-xl overflow-hidden">
              {userCrew.banner && (
                <img src={userCrew.banner} alt="" className="w-full h-32 object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="relative -mt-12 px-4 pb-4">
                <div className="flex items-end gap-4">
                  <div 
                    className="w-20 h-20 rounded-xl border-4 border-background flex items-center justify-center text-2xl font-bold text-white"
                    style={{ backgroundColor: userCrew.color }}
                  >
                    {userCrew.tag}
                  </div>
                  <div className="flex-1 pb-1">
                    <h2 className="text-xl font-bold">{userCrew.name}</h2>
                    <p className="text-sm text-muted-foreground">Rank #{userCrew.stats.rank} • {userCrew.memberCount}/{userCrew.maxMembers} members</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 text-yellow-600 rounded-full text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    {userCrew.stats.totalLaces.toLocaleString()} LACES
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Weekly LACES', value: userCrew.stats.weeklyLaces.toLocaleString(), icon: Zap, color: 'text-yellow-500' },
                { label: 'Verified Signals', value: userCrew.stats.verifiedSignals, icon: Shield, color: 'text-green-500' },
                { label: 'Trades', value: userCrew.stats.tradesCompleted, icon: TrendingUp, color: 'text-blue-500' },
                { label: 'Win Streak', value: `${userCrew.stats.winStreak}🔥`, icon: Star, color: 'text-orange-500' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-lg font-bold">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Territory */}
            {userCrew.territory && (
              <div className="bg-card border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Territory: {userCrew.territory.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Dominance: {userCrew.territory.dominance}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full rounded-full"
                    style={{ backgroundColor: userCrew.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${userCrew.territory.dominance}%` }}
                  />
                </div>
              </div>
            )}

            {/* Members */}
            <div className="bg-card border rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Members ({userCrew.memberCount})
              </h3>
              <div className="space-y-2">
                <MemberRow member={userCrew.leader} isLeader />
                {userCrew.members.map((member) => (
                  <MemberRow key={member.id} member={member} />
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-card border rounded-xl p-4">
              <h3 className="font-semibold mb-3">Recent Activity</h3>
              <div className="space-y-3">
                {mockCrewActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 text-sm">
                    <img src={activity.actor.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                      <p>{activity.description}</p>
                      {activity.lacesEarned && (
                        <span className="text-xs text-yellow-600">+{activity.lacesEarned} LACES</span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Territories Tab */}
        {activeTab === 'territories' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Claim Territories
              </h3>
              <p className="text-sm text-muted-foreground">
                Spend LACES to claim unclaimed territories. Your crew earns bonus LACES from all activity in your territory.
              </p>
            </div>

            {/* Claimed Territories */}
            <div>
              <h3 className="font-semibold mb-3">Claimed Territories</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {mockCrews.filter(c => c.territory).map((crew) => (
                  <div key={crew.id} className="bg-card border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: crew.color }}
                      >
                        {crew.tag}
                      </div>
                      <div>
                        <p className="font-medium">{crew.territory!.name}</p>
                        <p className="text-xs text-muted-foreground">Owned by {crew.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Dominance</span>
                      <span className="font-medium">{crew.territory!.dominance}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
                      <div className="h-full rounded-full" style={{ width: `${crew.territory!.dominance}%`, backgroundColor: crew.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unclaimed Territories */}
            <div>
              <h3 className="font-semibold mb-3">Available to Claim</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {unclaimedTerritories.map((territory) => (
                  <motion.div 
                    key={territory.id} 
                    className="bg-card border border-dashed rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{territory.name}</p>
                          <p className="text-xs text-muted-foreground">Activity Score: {territory.activityScore}</p>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      className="w-full flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                      whileHover={{ backgroundColor: 'rgba(var(--primary), 0.2)' }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Zap className="w-4 h-4" />
                      Claim for {territory.requiredLaces.toLocaleString()} LACES
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Crew Detail Modal */}
      <AnimatePresence>
        {selectedCrew && (
          <CrewDetailModal crew={selectedCrew} onClose={() => setSelectedCrew(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CrewCard({ crew, onClick }: { crew: Crew; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="bg-card border rounded-xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
          style={{ backgroundColor: crew.color }}
        >
          {crew.tag}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold truncate">{crew.name}</h3>
            {!crew.isPublic && <Lock className="w-3 h-3 text-muted-foreground" />}
          </div>
          <p className="text-sm text-muted-foreground">
            {crew.memberCount}/{crew.maxMembers} members • Rank #{crew.stats.rank}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{crew.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          <img src={crew.leader.avatar} alt="" className="w-6 h-6 rounded-full ring-2 ring-background" />
          {crew.members.slice(0, 3).map((m) => (
            <img key={m.id} src={m.avatar} alt="" className="w-6 h-6 rounded-full ring-2 ring-background" />
          ))}
        </div>
        <div className="flex items-center gap-1 text-sm text-yellow-600">
          <Zap className="w-4 h-4" />
          {crew.stats.weeklyLaces.toLocaleString()}
        </div>
      </div>
    </motion.div>
  );
}

function MemberRow({ member, isLeader = false }: { member: Crew['leader']; isLeader?: boolean }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
      <div className="relative">
        <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
        {member.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{member.username}</span>
          {isLeader && <Crown className="w-4 h-4 text-yellow-500" />}
          {member.role === 'officer' && <Shield className="w-4 h-4 text-blue-500" />}
        </div>
        <p className="text-xs text-muted-foreground">Rep: {member.repScore} • {member.lacesContributed.toLocaleString()} LACES</p>
      </div>
    </div>
  );
}

function CrewDetailModal({ crew, onClose }: { crew: Crew; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-background rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {crew.banner && (
          <img src={crew.banner} alt="" className="w-full h-32 object-cover rounded-t-xl" />
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: crew.color }}
            >
              {crew.tag}
            </div>
            <div>
              <h2 className="text-xl font-bold">{crew.name}</h2>
              <p className="text-sm text-muted-foreground">
                {crew.memberCount}/{crew.maxMembers} members • Rank #{crew.stats.rank}
              </p>
            </div>
          </div>
          <p className="text-muted-foreground">{crew.description}</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">{crew.stats.totalLaces.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total LACES</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">{crew.stats.verifiedSignals}</p>
              <p className="text-xs text-muted-foreground">Verified</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <p className="text-lg font-bold">{crew.stats.tradesCompleted}</p>
              <p className="text-xs text-muted-foreground">Trades</p>
            </div>
          </div>

          {crew.territory && (
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">Territory: {crew.territory.name}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${crew.territory.dominance}%`, backgroundColor: crew.color }} />
              </div>
            </div>
          )}

          <motion.button
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {crew.requiresApproval ? 'Request to Join' : 'Join Crew'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CrewsPage;

import { useQuery } from '@tanstack/react-query'
import { 
  Zap, 
  MapPin, 
  TrendingUp, 
  ShoppingBag,
  Activity,
  Rss,
  Users,
  ArrowRight
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { apiClient } from '@/lib/api-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/Button'

export default function Dashboard() {
  const navigate = useNavigate()

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiClient.getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000
  })

  const username = currentUser?.display_name || currentUser?.username || 'Member'

  const stats = [
    { label: 'LACES Balance', value: '8,420', icon: Zap, change: '+12%' },
    { label: 'Active Listings', value: '24', icon: ShoppingBag, change: '+3' },
    { label: 'Community Rank', value: '#247', icon: TrendingUp, change: '+15' },
    { label: 'Reputation', value: '94%', icon: Activity, change: '+2%' },
  ]

  const quickActions = [
    { label: 'Browse Feed', icon: Rss, path: '/feed', description: 'See latest drops and signals' },
    { label: 'Marketplace', icon: ShoppingBag, path: '/marketplace', description: 'Buy and sell items' },
    { label: 'Drop Zones', icon: MapPin, path: '/dropzones', description: 'Find nearby locations' },
    { label: 'Crews', icon: Users, path: '/crews', description: 'Join or manage crews' },
  ]

  const recentActivity = [
    { action: 'New drop posted', location: 'Downtown', time: '2m ago' },
    { action: 'Listing verified', location: 'Marketplace', time: '15m ago' },
    { action: 'Trade completed', location: 'Midtown', time: '1h ago' },
    { action: 'Crew invite received', location: 'Boston Kicks', time: '2h ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {username}</h1>
        <p className="text-muted-foreground">Here's what's happening in your network.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                to={action.path}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <action.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{action.label}</p>
                  <p className="text-sm text-muted-foreground truncate">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => navigate('/feed')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
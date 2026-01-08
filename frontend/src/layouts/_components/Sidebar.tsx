/**
 * Sidebar Navigation
 * Clean, functional sidebar
 */

import { NavLink } from 'react-router-dom'
import { Home, Map, Zap, User, Droplets, Rss, ClipboardList, ShoppingBag, Users } from 'lucide-react'
import { useUiStore } from '@/store/ui'
import { cn } from '@/lib/cn'

const links = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/feed', label: 'Feed', icon: Rss },
  { to: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
  { to: '/crews', label: 'Crews', icon: Users },
  { to: '/dropzones', label: 'Drop Zones', icon: Droplets },
  { to: '/map', label: 'Map', icon: Map },
  { to: '/quests', label: 'Quests', icon: ClipboardList },
  { to: '/laces', label: 'LACES', icon: Zap },
  { to: '/profile', label: 'Profile', icon: User },
]

export const Sidebar = () => {
  const { isSidebarOpen } = useUiStore()

  return (
    <aside
      className={cn(
        'relative hidden h-screen bg-card border-r border-border transition-all duration-300 md:flex md:flex-col',
        isSidebarOpen ? 'w-64' : 'w-20',
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-border px-4">
        <h1 
          className={cn(
            'font-bold text-primary transition-all duration-300',
            isSidebarOpen ? 'text-xl' : 'text-lg'
          )}
        >
          {isSidebarOpen ? 'Dharma' : 'D'}
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    'hover:bg-muted',
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground',
                    !isSidebarOpen && 'justify-center px-2',
                  )
                }
              >
                <link.icon className="h-5 w-5" strokeWidth={2} />
                {isSidebarOpen && <span>{link.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className={cn(
          'flex items-center gap-3',
          !isSidebarOpen && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            D
          </div>
          {isSidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">David</p>
              <p className="text-xs text-muted-foreground truncate">david@dharma.com</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

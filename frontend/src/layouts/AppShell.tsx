/**
 * AppShell
 * Main application layout with sidebar and topbar
 */

import { Outlet } from 'react-router-dom'
import { Topbar } from './_components/Topbar'
import { Sidebar } from './_components/Sidebar'

const AppShell = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-muted/30 p-6 md:p-8">
          <div className="container-elegant">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AppShell

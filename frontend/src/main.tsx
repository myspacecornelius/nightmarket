import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import router from './routes'
import './index.css'
import { ThemeProvider } from './components/ThemeProvider'
import { AuthProvider } from './hooks/useAuth'
import { WebSocketProvider } from './components/WebSocketProvider'

console.log('🔥 Dharma - Starting the underground network...')

const root = document.getElementById('root')

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 60 * 1000,
    },
    mutations: {
      retry: 0,
    },
  },
})

if (!root) {
  throw new Error('Root element not found')
}

console.log('✅ Root element found, initializing React...')

const reactRoot = createRoot(root)

reactRoot.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="dharma-theme">
          <WebSocketProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
          </WebSocketProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

console.log('🚀 Dharma successfully mounted!')

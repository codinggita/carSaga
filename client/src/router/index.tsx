import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { AuthPage } from '@/pages/AuthPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { VerificationPage } from '@/pages/VerificationPage'
import { ReportPage } from '@/pages/ReportPage'
import { ChatPage } from '@/pages/ChatPage'
import { AnalyticsPage } from '@/pages/AnalyticsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/verify',
    element: <VerificationPage />,
  },
  {
    path: '/report/:id',
    element: <ReportPage />,
  },
  {
    path: '/chat',
    element: <ChatPage />,
  },
  {
    path: '/analytics',
    element: <AnalyticsPage />,
  },
])

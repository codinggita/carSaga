import { createBrowserRouter } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { SignInPage } from '@/pages/SignInPage'
import { RegisterPage } from '@/pages/RegisterPage'
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
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
  {
    path: '/verification',
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

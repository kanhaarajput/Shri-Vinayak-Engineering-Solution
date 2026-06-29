import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '@components/layout/RootLayout'

// Lazy loaded pages
const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Services = lazy(() => import('@pages/Services'))
const Gallery = lazy(() => import('@pages/Gallery'))
const Contact = lazy(() => import('@pages/Contact'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Admin Pages
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'))
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'))
const AdminGallery = lazy(() => import('./admin/pages/AdminGallery'))
const AdminServices = lazy(() => import('./admin/pages/AdminServices'))
const AdminHome = lazy(() => import('./admin/pages/AdminHome'))
const AdminAbout = lazy(() => import('./admin/pages/AdminAbout'))
const AdminContact = lazy(() => import('./admin/pages/AdminContact'))
const AdminMessages = lazy(() => import('./admin/pages/AdminMessages'))
const AdminTeam = lazy(() => import('./admin/pages/AdminTeam'))
const AdminFuturePlans = lazy(() => import('./admin/pages/AdminFuturePlans'))
const AdminMedia = lazy(() => import('./admin/pages/AdminMedia'))

import { DataProvider } from './context/DataContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true,        element: <Home /> },
      { path: 'about',      element: <About /> },
      { path: 'services',   element: <Services /> },
      { path: 'gallery',    element: <Gallery /> },
      { path: 'contact',    element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'home', element: <AdminHome /> },
      { path: 'about', element: <AdminAbout /> },
      { path: 'contact', element: <AdminContact /> },
      { path: 'gallery', element: <AdminGallery /> },
      { path: 'services', element: <AdminServices /> },
      { path: 'messages', element: <AdminMessages /> },
      { path: 'team', element: <AdminTeam /> },
      { path: 'future-plans', element: <AdminFuturePlans /> },
      { path: 'media', element: <AdminMedia /> },
    ],
  },
])

// A premium loading fallback spinner
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
  </div>
)

export default function App() {
  return (
    <DataProvider>
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </DataProvider>
  )
}

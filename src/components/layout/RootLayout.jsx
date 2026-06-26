import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '@components/layout/ScrollToTop'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <ScrollToTop />
      <Navbar />
      {/* No top padding — hero sections handle their own full-bleed layout */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

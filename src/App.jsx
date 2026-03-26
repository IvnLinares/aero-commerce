import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCartStore from './store/useCartStore'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import { AnimatePresence } from 'framer-motion'
import PageWrapper from './components/PageWrapper'
import CartDrawer from './components/CartDrawer'
import SearchModal from './components/SearchModal'
import ToastContainer from './components/ToastContainer'

/* ── SF Symbols–style icons ── */
const IcoBag = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
)

const IcoSearch = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
)

function Navbar() {
  const cart = useCartStore((state) => state.cart)
  const setCartOpen = useCartStore((state) => state.setCartOpen)
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className="sticky top-0 z-50 apple-glass-nav">
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center gap-4">

        {/* Logo */}
        <NavLink to="/" className="font-semibold text-lg text-[#1d1d1f] no-underline whitespace-nowrap shrink-0 tracking-tight">
          Aero<span className="font-bold text-[#0071e3]">Commerce</span>
        </NavLink>

        {/* Search bar */}
        <div className="flex-1 max-w-xl mx-auto hidden md:flex">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center w-full apple-input hover:border-[#86868b]/50 transition-colors bg-[#f5f5f7]/50 cursor-text text-left px-3 py-1.5 border-0 focus:outline-none"
          >
            <IcoSearch className="w-4 h-4 text-[#86868b] mr-2" />
            <span className="flex-1 text-sm text-[#86868b]">Search products...</span>
            <span className="text-[10px] font-medium text-[#86868b] bg-[#e5e5ea]/50 px-1.5 py-0.5 rounded border border-[#e5e5ea]">⌘K</span>
          </button>
        </div>

        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto md:ml-0 shrink-0">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 no-underline text-[#1d1d1f] hover:text-[#0071e3] transition-colors bg-transparent border-0 cursor-pointer p-0"
          >
            <IcoBag className="w-5 h-5" />
            
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#0071e3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="hidden sm:inline-block text-sm font-medium">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="mt-auto bg-[#f5f5f7] border-t border-black/5">
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: 'Shop and Learn', links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Accessories'] },
            { title: 'Services', links: ['Apple Music', 'Apple TV+', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts'] },
            { title: 'Account', links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'] },
            { title: 'About AeroCommerce', links: ['Newsroom', 'Leadership', 'Career Opportunities', 'Investors', 'Ethics & Compliance', 'Events'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[#1d1d1f] text-xs font-semibold mb-3">{col.title}</h4>
              <ul className="flex flex-col gap-2 list-none p-0 m-0">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#515154] hover:text-[#1d1d1f] text-xs transition-colors no-underline">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#86868b] text-xs">Copyright © 2026 AeroCommerce Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="text-[#515154] hover:text-[#1d1d1f] text-xs no-underline">Privacy Policy</a>
            <div className="w-px h-3 bg-black/10 my-auto" />
            <a href="#" className="text-[#515154] hover:text-[#1d1d1f] text-xs no-underline">Terms of Use</a>
            <div className="w-px h-3 bg-black/10 my-auto" />
            <a href="#" className="text-[#515154] hover:text-[#1d1d1f] text-xs no-underline">Sales and Refunds</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function AppContent() {
  const location = useLocation()
  
  return (
    <div className="relative flex flex-col min-h-screen z-10 w-full overflow-x-hidden">
      <Navbar />
      <CartDrawer />
      <ToastContainer />
      <main className="flex-1 pb-12 relative w-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
            <Route path="/cart" element={<PageWrapper><Cart /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App


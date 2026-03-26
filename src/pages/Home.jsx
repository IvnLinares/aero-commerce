import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'

/* ── SF Symbols category icons ── */
const IcoShirt = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.5 2.27l.63 4.37A2 2 0 004.7 12H6v8a2 2 0 002 2h8a2 2 0 002-2v-8h1.3a2 2 0 001.95-1.9l.63-4.37a2 2 0 00-1.5-2.27z" />
  </svg>
)
const IcoJacket = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L8 1 L2 5v4l3-1v13h14V8l3 1V5L16 1z"/>
    <path d="M12 3 L10 8 L12 10 L14 8z"/>
  </svg>
)
const IcoDress = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-1.1 0-2 .5-2 1.5V6L6 10l-2 11h16L18 10l-4-4V3.5C14 2.5 13.1 2 12 2z"/>
  </svg>
)
const IcoGem = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="6 3 18 3 22 9 12 22 2 9"/>
    <polyline points="2 9 12 22 22 9"/>
    <line x1="6" y1="3" x2="2" y2="9"/>
    <line x1="18" y1="3" x2="22" y2="9"/>
    <line x1="6" y1="3" x2="12" y2="13"/>
    <line x1="18" y1="3" x2="12" y2="13"/>
  </svg>
)
const IcoBolt = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IcoGrid = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
)

const CATEGORIES = [
  { label: "Men's",      key: "men's clothing",    icon: <IcoShirt /> },
  { label: "Jacket",     key: "men's clothing",    icon: <IcoJacket /> },
  { label: "Women's",    key: "women's clothing",  icon: <IcoDress /> },
  { label: "Jewelry",    key: 'jewelery',          icon: <IcoGem /> },
  { label: "Tech",       key: 'electronics',       icon: <IcoBolt /> },
  { label: "All",        key: null,                icon: <IcoGrid /> },
]

const TABS = [
  { key: 'all',      label: 'Recommendations' },
  { key: 'stylish',  label: 'New Arrivals' },
  { key: 'discount', label: 'Special Value' },
  { key: 'official', label: 'Official Store' },
]

function useCountdown() {
  const [time, setTime] = useState({ h: 8, m: 17, s: 56 })
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s--; if (s < 0) { s = 59; m-- }
        if (m < 0) { m = 59; h-- }
        if (h < 0) return { h: 23, m: 59, s: 59 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function SkeletonCard() {
  return (
    <div className="apple-card animate-pulse p-4 rounded-2xl h-80 flex flex-col justify-end">
      <div className="h-32 mb-4 mx-auto w-3/4 rounded-xl" style={{ background: 'rgba(0,0,0,0.04)' }} />
      <div className="h-4 rounded-md mb-2" style={{ background: 'rgba(0,0,0,0.06)', width: '100%' }} />
      <div className="h-4 rounded-md mb-4" style={{ background: 'rgba(0,0,0,0.04)', width: '70%' }} />
      <div className="h-5 rounded-md mt-auto" style={{ background: 'rgba(0,0,0,0.05)', width: '40%' }} />
    </div>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [activeCategory, setActiveCategory] = useState(null)
  const timer = useCountdown()
  const pad = (n) => String(n).padStart(2, '0')

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const flashProducts = products.slice(0, 6)
  const catalog = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  return (
    <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col gap-6">

      {/* ── Hero banner ── */}
      <div
        className="relative overflow-hidden rounded-4xl h-64 md:h-88 flex items-center shadow-sm border border-black/5"
        style={{ background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' }}
      >
        <div className="relative z-10 px-8 md:px-16 max-w-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-black/60 mb-3">
            Special Event
          </p>
          <h2 className="text-[#1d1d1f] text-4xl md:text-5xl font-bold leading-tight mb-4 tracking-tight">
            Style reinvented.<br />
            Up to 50% Off.
          </h2>
          <p className="text-[#1d1d1f]/70 text-base md:text-lg mb-6 leading-relaxed">
            Discover a curated collection of premium essentials that elevate your everyday style seamlessly.
          </p>
          <button className="apple-btn-secondary px-5 py-2 text-sm whitespace-nowrap min-w-40 border border-black/5">
            Explore the Collection
          </button>
        </div>
      </div>

      {/* ── Category icons ── */}
      <div className="mt-2">
        <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">Categories</h3>
        <div className="flex items-center justify-start md:justify-around gap-4 overflow-x-auto pb-4">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.key
            return (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.key)}
                className="flex flex-col items-center gap-3 cursor-pointer min-w-17.5 transition-all border-0 bg-transparent group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    active 
                      ? 'bg-[#1d1d1f] text-white shadow-md transform scale-105' 
                      : 'bg-white text-[#1d1d1f] hover:bg-[#f2f2f7] border border-black/5'
                  }`}
                >
                  {cat.icon}
                </div>
                <span className={`text-xs font-medium transition-colors whitespace-nowrap ${active ? 'text-[#1d1d1f]' : 'text-[#86868b] group-hover:text-[#1d1d1f]'}`}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Flash Sale ── */}
      <div className="pt-4 border-t border-black/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight mb-1">Limited Time Offers</h2>
            <p className="text-[#86868b] text-sm">Exceptional value on select items today.</p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
            <svg className="w-4 h-4 text-[#ff3b30]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-semibold text-[#1d1d1f]">Ends in:</span>
            <div className="flex items-center gap-1 text-xs font-medium font-mono">
              <span className="bg-[#f2f2f7] px-1.5 py-0.5 rounded text-[#1d1d1f]">{pad(timer.h)}</span>:
              <span className="bg-[#f2f2f7] px-1.5 py-0.5 rounded text-[#1d1d1f]">{pad(timer.m)}</span>:
              <span className="bg-[#f2f2f7] px-1.5 py-0.5 rounded text-[#ff3b30]">{pad(timer.s)}</span>
            </div>
          </div>
        </div>
        <motion.div
          key={`flash-${loading}`}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : flashProducts.map((p) => (
                <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <ProductCard product={p} compact />
                </motion.div>
              ))
          }
        </motion.div>
      </div>

      {/* ── Today's For You ── */}
      <div className="pt-8 mb-8 border-t border-black/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-[#1d1d1f] tracking-tight whitespace-nowrap">
            Just for You
          </h2>
          <div className="flex gap-2 bg-[#e3e3e8]/50 p-1 rounded-full overflow-x-auto self-start md:self-auto max-w-full">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer border-0 transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-white text-[#1d1d1f] shadow-sm'
                    : 'bg-transparent text-[#515154] hover:text-[#1d1d1f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div
          key={`catalog-${loading}-${activeCategory}-${activeTab}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : catalog.slice(0, 10).map((p) => (
                <motion.div key={p.id} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }}>
                  <ProductCard product={p} />
                </motion.div>
              ))
          }
        </motion.div>
      </div>

    </div>
  )
}


import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useCartStore from '../store/useCartStore'
import useToastStore from '../store/useToastStore'

const IcoHeart = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill={filled ? '#ff3b30' : 'none'} stroke={filled ? '#ff3b30' : 'currentColor'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
)

const IcoCartPlus = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    <line x1="17" y1="9" x2="22" y2="9"/><line x1="19.5" y1="6.5" x2="19.5" y2="11.5"/>
  </svg>
)

const IcoStar = ({ filled }) => (
  <svg className={`w-3 h-3 ${filled ? 'fill-[#f5bd02] text-[#f5bd02]' : 'fill-[#e5e5ea] text-[#e5e5ea]'}`} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
)

export default function ProductCard({ product, compact = false }) {
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef(null)
  const addToCart = useCartStore((state) => state.addToCart)
  const addToast = useToastStore((state) => state.addToast)

  const originalPrice = (product.price * 1.38).toFixed(2)
  const rating = product.rating?.rate ?? 4.2

  const handleAdd = () => {
    addToCart(product)
    setJustAdded(true)
    addToast(`"${product.title.slice(0, 30)}..." added to bag`)
    setTimeout(() => setJustAdded(false), 1500)
  }

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlare({ x, y, opacity: 0.12 })
  }

  const handleMouseLeave = () => {
    setGlare({ x: 50, y: 50, opacity: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`group relative apple-card flex flex-col overflow-hidden ${compact ? 'p-3' : 'p-4'}`}
      style={{ isolation: 'isolate' }}
    >
      {/* Glare effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 2.5}) 0%, transparent 60%)`,
          opacity: glare.opacity > 0 ? 1 : 0,
          zIndex: 2,
        }}
      />

      {/* Wishlist */}
      <button
        onClick={() => setWishlisted((w) => !w)}
        className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer border-0 bg-black/5 hover:bg-black/10 transition-colors"
        aria-label="Wishlist"
      >
        <IcoHeart filled={wishlisted} />
      </button>

      {/* Image */}
      <Link
        to={`/product/${product.id}`}
        className={`flex items-center justify-center no-underline overflow-hidden ${compact ? 'h-32 mb-2' : 'h-48 mb-4'}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">{product.category}</span>
        </div>
        
        <Link
          to={`/product/${product.id}`}
          className={`text-[#1d1d1f] font-semibold no-underline hover:text-[#0071e3] transition-colors leading-snug line-clamp-2 ${compact ? 'text-xs' : 'text-sm'}`}
        >
          {product.title}
        </Link>
        
        <div className="flex items-center gap-0.5 mt-0.5">
          {Array.from({ length: 5 }, (_, i) => <IcoStar key={i} filled={i < Math.floor(rating)} />)}
          <span className="text-[11px] text-[#86868b] ml-1">{product.rating?.count ?? 0}</span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className={`font-semibold text-[#1d1d1f] tracking-tight ${compact ? 'text-sm' : 'text-lg'}`}>
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[11px] text-[#86868b] line-through">${originalPrice}</span>
          </div>
          
          {!compact && (
            <button
              onClick={handleAdd}
              disabled={justAdded}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-0 cursor-pointer transition-all duration-300 ${
                justAdded ? 'bg-[#34c759] text-white scale-110' : 'bg-[#e8e8ed] hover:bg-[#d1d1d6] text-[#1d1d1f]'
              }`}
              title="Add to cart"
            >
              {justAdded ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <IcoCartPlus />
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

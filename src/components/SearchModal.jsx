import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setLoading(true)
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data)
          setLoading(false)
        })
        .catch(() => setLoading(false))

      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (id) => {
    navigate(`/product/${id}`)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-200 flex items-start justify-center pt-[10vh] px-4 isolate">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md -z-10"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#f5f5f7]/90 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/50"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-black/5 bg-white/50 backdrop-blur-md">
              <Search className="w-6 h-6 text-[#86868b] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AeroCommerce..."
                className="flex-1 bg-transparent border-none outline-none text-xl px-4 text-[#1d1d1f] placeholder:text-[#86868b] font-medium min-w-0"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 transition-colors border-0 bg-transparent cursor-pointer flex items-center pr-2"
              >
                <span className="text-[10px] uppercase font-bold text-[#86868b] mr-1 border border-black/10 rounded px-1.5 py-0.5">ESC</span>
                <X className="w-5 h-5 hidden sm:inline" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
              {loading && !products.length ? (
                <div className="p-12 text-center text-[#86868b] text-sm flex items-center justify-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#86868b] border-t-transparent animate-spin" />
                  <span className="font-medium">Searching Catalog...</span>
                </div>
              ) : query && filtered.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-[#1d1d1f] font-medium text-lg">No results found for "{query}"</p>
                  <p className="text-[#86868b] text-sm mt-1">Try checking for typos or using different keywords.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {query && <div className="px-3 py-2 text-xs font-bold text-[#86868b] tracking-wider uppercase">Products</div>}
                  
                  {(query ? filtered : products.slice(0, 5)).map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelect(product.id)}
                      className="w-full flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-[#0071e3] hover:text-white transition-colors group cursor-pointer border-0 bg-transparent text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 shrink-0 group-hover:shadow-sm mix-blend-normal">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain filter " />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium tracking-tight truncate group-hover:text-white text-[#1d1d1f]">
                          {product.title}
                        </h4>
                        <p className="text-xs text-[#86868b] group-hover:text-white/80 capitalize">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-sm font-semibold group-hover:text-white text-[#1d1d1f]">
                        ${product.price.toFixed(2)}
                      </div>
                    </button>
                  ))}
                  
                  {!query && products.length > 0 && (
                    <div className="px-3 pt-6 pb-4 text-xs font-medium text-[#86868b] text-center">
                      Begin typing to search all {products.length} products
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

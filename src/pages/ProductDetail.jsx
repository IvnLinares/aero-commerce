import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'
import useToastStore from '../store/useToastStore'

const IcoStar = ({ filled }) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill={filled ? '#f5bd02' : 'none'} stroke={filled ? '#f5bd02' : '#e5e5ea'} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const IcoCartPlus = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/>
    <line x1="18" y1="9" x2="18" y2="15"/><line x1="15" y1="12" x2="21" y2="12"/>
  </svg>
)

const IcoCheck = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#34c759" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const IcoArrowLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [justAdded, setJustAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const addToCart = useCartStore((s) => s.addToCart)
  const setCartOpen = useCartStore((s) => s.setCartOpen)
  const addToast = useToastStore((s) => s.addToast)

  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((r) => r.json())
      .then((d) => { setProduct(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setJustAdded(true)
    addToast(`Added ${qty > 1 ? `${qty}× ` : ''}"${product.title.slice(0, 28)}..." to bag`)
    setTimeout(() => {
      setJustAdded(false)
      setCartOpen(true)
    }, 1200)
  }

  if (loading) return (
    <div className="max-w-5xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="apple-card h-96 animate-pulse border border-black/5" />
      <div className="flex flex-col gap-4 pt-4">
        {[80, 50, 30, 70, 40].map((w, i) => (
          <div key={i} className="h-4 rounded-md animate-pulse bg-black/5" style={{ width: `${w}%` }}/>
        ))}
      </div>
    </div>
  )

  if (!product) return (
    <div className="max-w-5xl mx-auto px-5 py-24 text-center">
      <p className="text-[#86868b] text-lg">Product not found.</p>
      <Link to="/" className="text-[#0071e3] font-medium text-sm mt-3 inline-block hover:underline">← Continue Shopping</Link>
    </div>
  )

  const discountPct = Math.floor(10 + Math.random() * 20)
  const originalPrice = (product.price + product.price * discountPct / 100).toFixed(2)
  const stars = Math.round(product.rating?.rate || 4)

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#86868b] mb-8 font-medium">
        <Link to="/" className="hover:text-[#1d1d1f] transition-colors no-underline">Home</Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-[#1d1d1f] line-clamp-1">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        {/* Image panel */}
        <div className="apple-card p-10 flex items-center justify-center min-h-100 border border-black/5 sticky top-24">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm max-h-96 object-contain mix-blend-multiply"
          />
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#86868b] mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-[#1d1d1f] leading-tight tracking-tight">{product.title}</h1>
          </div>

          {/* Stars + reviews */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((n) => <IcoStar key={n} filled={n <= stars} />)}
            </div>
            <span className="text-sm font-medium text-[#1d1d1f]">{product.rating?.rate?.toFixed(1) || '4.0'}</span>
            <span className="text-[#86868b] text-sm">({product.rating?.count || 0} reviews)</span>
          </div>

          <div className="w-full h-px bg-black/5 my-2" />

          {/* Price row */}
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-semibold text-[#1d1d1f] tracking-tight">${product.price.toFixed(2)}</span>
            <span className="text-lg text-[#86868b] line-through">${originalPrice}</span>
          </div>

          {/* Qty row */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm font-semibold text-[#1d1d1f]">Quantity</span>
            <div className="flex items-center gap-3 bg-[#f5f5f7] rounded-full p-1 border border-black/5">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 text-[#1d1d1f] font-medium text-lg cursor-pointer border-0 transition-colors"
              >−</button>
              <span className="w-6 text-center text-sm font-semibold text-[#1d1d1f]">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 text-[#1d1d1f] font-medium text-lg cursor-pointer border-0 transition-colors"
              >+</button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={justAdded}
            className={`mt-4 flex items-center justify-center gap-2 apple-btn-primary py-4 text-[15px] cursor-pointer w-full transition-all ${justAdded ? 'bg-[#34c759]' : ''}`}
          >
            {justAdded ? (
              <><IcoCheck /> <span className="text-white">Added to Bag</span></>
            ) : (
              <><IcoCartPlus /> <span>Add to Bag</span></>
            )}
          </button>

          {/* Guarantees */}
          <div className="flex flex-col gap-3 mt-4">
            {['Free delivery on orders over $50', '30-day free returns', 'Apple Pay accepted'].map((g) => (
              <div key={g} className="flex items-center gap-3">
                <IcoCheck />
                <span className="text-sm text-[#515154]">{g}</span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-black/5 my-2" />

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-[#1d1d1f]">Description</h3>
            <p className="text-[15px] text-[#515154] leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}


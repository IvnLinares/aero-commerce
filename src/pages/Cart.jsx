import { Link } from 'react-router-dom'
import useCartStore from '../store/useCartStore'

const IcoTrash = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4h6v2"/>
  </svg>
)

const IcoArrowLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
  </svg>
)

export default function Cart() {
  const cart = useCartStore((s) => s.cart)
  const removeFromCart = useCartStore((s) => s.removeFromCart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const clearCart = useCartStore((s) => s.clearCart)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.13
  const total = subtotal + tax

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-8">Review your bag.</h1>

      {cart.length === 0 ? (
        <div className="apple-card flex flex-col items-center justify-center py-24 gap-5 text-center border border-black/5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-[#f5f5f7]">
            <svg className="w-8 h-8 text-[#86868b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#1d1d1f]">Your bag is empty.</h2>
          <p className="text-[#515154]">Free delivery and free returns.</p>
          <Link
            to="/"
            className="apple-btn-secondary mt-2 flex items-center gap-2"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.id} className="apple-card p-6 flex flex-col sm:flex-row items-center gap-6 border border-black/5">
                <div className="w-32 h-32 shrink-0 flex items-center justify-center bg-white rounded-2xl p-4 mix-blend-multiply">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1d1d1f] line-clamp-2 leading-snug">{item.title}</h3>
                      <p className="text-sm font-medium uppercase tracking-widest text-[#86868b] mt-1">{item.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-semibold text-[#1d1d1f]">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-1 bg-[#f5f5f7] rounded-full p-1 border border-black/5">
                      <button
                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/5 font-medium text-lg cursor-pointer border-0 transition-colors"
                      >−</button>
                      <span className="w-6 text-center text-sm font-semibold text-[#1d1d1f]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/5 font-medium text-lg cursor-pointer border-0 transition-colors"
                      >+</button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#0071e3] text-sm hover:underline cursor-pointer border-0 bg-transparent p-0"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="apple-card p-6 lg:sticky lg:top-24 border border-black/5">
              <h2 className="text-2xl font-semibold text-[#1d1d1f] mb-6">Summary</h2>
              
              <div className="flex flex-col gap-4 text-[15px]">
                <div className="flex justify-between text-[#515154]">
                  <span>Subtotal</span>
                  <span className="text-[#1d1d1f] font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#515154]">
                  <span>Estimated Tax</span>
                  <span className="text-[#1d1d1f] font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#515154]">
                  <span>Shipping</span>
                  <span className="text-[#1d1d1f] font-medium">Free</span>
                </div>
                
                <div className="w-full h-px bg-black/5 my-2" />
                
                <div className="flex justify-between items-end">
                  <span className="text-xl font-semibold text-[#1d1d1f]">Total</span>
                  <span className="text-2xl font-semibold text-[#1d1d1f] tracking-tight">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => { alert('Purchase completed securely with Apple Pay.'); clearCart() }}
                className="mt-8 w-full apple-btn-primary py-4 text-base shadow-sm"
              >
                Check Out
              </button>
              
              <Link to="/" className="mt-4 flex items-center justify-center gap-2 text-sm text-[#0071e3] hover:underline transition-colors no-underline">
                 Continue Shopping
              </Link>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

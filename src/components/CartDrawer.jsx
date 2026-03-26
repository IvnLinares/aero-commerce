import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import useCartStore from '../store/useCartStore'

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setCartOpen } = useCartStore()

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-100 isolate">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-100 bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <h2 className="text-xl font-semibold text-[#1d1d1f] tracking-tight">Your Bag</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 -mr-2 text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/5 rounded-full transition-colors cursor-pointer border-0 bg-transparent"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 bg-[#f5f5f7] rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-[#86868b]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[#1d1d1f]">Your bag is empty.</h3>
                    <p className="text-sm text-[#86868b] mt-1">Free delivery and free returns.</p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-4 apple-btn-primary border-0 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={item.id} 
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-24 bg-[#f5f5f7] rounded-xl flex items-center justify-center p-2 shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain filter mix-blend-multiply"
                        />
                      </div>
                      
                      <div className="flex flex-col justify-between flex-1 py-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium text-[#1d1d1f] line-clamp-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#86868b] hover:text-red-500 transition-colors p-1 -mt-1 -mr-1 border-0 bg-transparent cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-3 bg-[#f5f5f7] rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              className="text-[#86868b] hover:text-[#1d1d1f] transition-colors border-0 bg-transparent cursor-pointer p-0"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium text-[#1d1d1f] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-[#86868b] hover:text-[#1d1d1f] transition-colors border-0 bg-transparent cursor-pointer p-0"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="font-semibold text-[#1d1d1f]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-black/5 bg-[#f5f5f7]/50 backdrop-blur-md">
                <div className="flex justify-between mb-4">
                  <span className="text-[#86868b]">Subtotal</span>
                  <span className="font-semibold text-[#1d1d1f]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-6 text-sm text-[#86868b]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <button className="apple-btn-primary w-full shadow-sm border-0 cursor-pointer">
                  Check Out
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
import useToastStore from '../store/useToastStore'
import { Check, Info } from 'lucide-react'

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts)

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-300 flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -40, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="pointer-events-auto bg-[#1d1d1f]/90 text-[#f5f5f7] px-4 py-3 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl border border-white/10"
          >
            {toast.type === 'success' ? (
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 text-green-400" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Info className="w-3.5 h-3.5 text-blue-400" />
              </div>
            )}
            <span className="text-sm font-medium tracking-tight pr-2 truncate max-w-xs">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

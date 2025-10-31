import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-xl font-bold text-gray-800">Información importante</h3>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Cerrar aviso"
                  >
                    <X size={22} />
                  </button>
                </div>
                <div className="mt-4">
                  <div className="flex items-start gap-3 bg-secondary/10 text-gray-700 border-l-4 border-secondary rounded-md p-3">
                    <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
                    </svg>
                    <p className="font-body text-sm leading-snug">
                      <span className="font-semibold">Importante:</span> para tortas completas (no porciones), realizá tu pedido con 24 horas de anticipación.
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2 bg-primary hover:bg-opacity-90 text-white font-body font-semibold rounded-lg transition-colors"
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



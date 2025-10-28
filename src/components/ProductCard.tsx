import { Plus } from 'lucide-react';
import { Product } from '../types';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const hiddenDescRef = useRef<HTMLParagraphElement>(null);

  // Verificar overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current && hiddenDescRef.current) {
        // Asegurar que el elemento oculto tenga el mismo ancho que el visible
        const visibleWidth = descriptionRef.current.offsetWidth;
        hiddenDescRef.current.style.width = `${visibleWidth}px`;
        
        // Comparar las alturas
        const hiddenHeight = hiddenDescRef.current.scrollHeight;
        const visibleHeight = descriptionRef.current.clientHeight;
        
        const isOverflowing = hiddenHeight > visibleHeight;
        
        // Mostrar botón solo cuando hay overflow Y no está expandido, o cuando está expandido
        setShowButton(isOverflowing || isExpanded);
      }
    };

    // Múltiples intentos para asegurar que se detecte correctamente
    const timer1 = setTimeout(checkOverflow, 50);
    const timer2 = setTimeout(checkOverflow, 200);
    const timer3 = setTimeout(checkOverflow, 500);
    
    // También escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkOverflow);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [isExpanded]);

  const formatPrice = (price: number) => {
    return `Gs. ${price.toLocaleString('es-PY')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        {/* Elemento oculto para medir el contenido completo */}
        <p 
          ref={hiddenDescRef}
          className="font-body text-sm text-gray-600 invisible opacity-0 pointer-events-none"
          style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre-wrap' }}
        >
          {product.description}
        </p>
        <div className="overflow-hidden">
          <motion.p 
            ref={descriptionRef}
            layout
            initial={false}
            transition={{ 
              layout: {
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
            className={`font-body text-sm text-gray-600 mb-3 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {product.description}
          </motion.p>
        </div>
        <AnimatePresence mode="wait">
          {showButton && (
            <motion.button
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                marginTop: '0.75rem'
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                marginTop: 0
              }}
              transition={{ 
                duration: 0.2,
                ease: "easeInOut"
              }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 font-semibold text-sm mb-3 transition-colors block"
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </motion.button>
          )}
        </AnimatePresence>
        <div className="flex items-center justify-between">
          <span className="font-body text-md font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          <motion.button
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-opacity-90 text-white p-2 rounded-full"
            aria-label="Agregar al carrito"
            whileTap={{ scale: 0.8, rotate: 180 }}
            whileHover={{ scale: 1.15 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
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
        <p className="font-body text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-body text-lg font-semibold text-primary">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-opacity-90 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Agregar al carrito"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

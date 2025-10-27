import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

export default function CartButton({ itemCount, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-primary hover:bg-opacity-90 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-30"
      aria-label="Ver carrito"
    >
      <ShoppingCart size={28} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-secondary text-gray-800 font-body font-bold text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md">
          {itemCount}
        </span>
      )}
    </button>
  );
}

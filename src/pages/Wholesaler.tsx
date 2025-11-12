import { useState } from 'react';
import HeaderWholesaler from '../components/wholesalerComponents/HeaderWholesaler';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import CartButton from '../components/CartButton';
import CartModal from '../components/CartModal';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import InfoModal from '../components/InfoModal';
import { Product, CartItem } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { CheckoutData } from '../components/CheckoutForm';

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  
  const { products, loading: productsLoading } = useProducts();
  const { categories } = useCategories();

  const filteredProducts =
    activeCategory === 'Todos'
      ? products
      : products.filter((product) => product.category === activeCategory);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleConfirmCheckout = (checkoutData: CheckoutData) => {
    const formatPrice = (price: number) => `Gs. ${price.toLocaleString('es-PY')}`;

    let message = '¡Hola Nissi Pastelería! 👋\n\n';
    message += 'Quisiera realizar el siguiente pedido:\n\n';
    
    // Información del cliente
    message += '*INFORMACIÓN DEL CLIENTE:*\n';
    if (checkoutData.ruc) {
      message += `RUC: ${checkoutData.ruc}\n`;
    }
    if (checkoutData.businessName) {
      message += `Razón Social: ${checkoutData.businessName}\n`;
    }
    message += `Tipo de Pedido: ${checkoutData.orderType === 'delivery' ? 'Delivery' : 'Retiro en Tienda'}\n\n`;

    // Si es delivery, agregar información de entrega
    if (checkoutData.orderType === 'delivery') {
      message += '*DIRECCIÓN DE ENTREGA:*\n';
      message += `Dirección: ${checkoutData.address}\n`;
      message += `Número de Casa: ${checkoutData.houseNumber}\n`;
      message += `Referencia: ${checkoutData.reference}\n\n`;
    }

    message += '*PRODUCTOS:*\n';

    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      message += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)} c/u)`;
      if (item.quantity > 1) {
        message += ` - Total: ${formatPrice(itemTotal)}`;
      }
      message += '\n';
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    message += `\n*TOTAL DEL PEDIDO: ${formatPrice(total)}*\n\n`;
    message += 'Espero confirmación. ¡Gracias!';

    const whatsappUrl = `https://wa.me/595982959175?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar el carrito y el formulario
    setShowCheckoutForm(false);
    setIsCartOpen(false);
    
    // Limpiar el carrito
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background font-body">
      <HeaderWholesaler />
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      {productsLoading ? (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
      )}
      <Footer />
      <CartButton itemCount={totalItems} onClick={() => setIsCartOpen(true)} />
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />
      <CheckoutForm
        isOpen={showCheckoutForm}
        onClose={() => setShowCheckoutForm(false)}
        onConfirm={handleConfirmCheckout}
      />
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} />
    </div>
  );
}

export default App;

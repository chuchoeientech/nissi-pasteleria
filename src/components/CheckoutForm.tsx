import { useState } from 'react';
import { X, Truck, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: CheckoutData) => void;
}

export interface CheckoutData {
  orderType: 'delivery' | 'pickup';
  ruc?: string;
  businessName?: string;
  address?: string;
  houseNumber?: string;
  reference?: string;
}

export default function CheckoutForm({ isOpen, onClose, onConfirm }: CheckoutFormProps) {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('pickup');
  const [ruc, setRuc] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (orderType === 'delivery') {
      if (!address.trim()) {
        newErrors.address = 'La dirección es obligatoria para delivery';
      }
      if (!houseNumber.trim()) {
        newErrors.houseNumber = 'El número de casa es obligatorio para delivery';
      }
      if (!reference.trim()) {
        newErrors.reference = 'La referencia es obligatoria para delivery';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const checkoutData: CheckoutData = {
      orderType,
    };

    const trimmedRuc = ruc.trim();
    const trimmedBusinessName = businessName.trim();
    
    if (trimmedRuc) {
      checkoutData.ruc = trimmedRuc;
    }
    
    if (trimmedBusinessName) {
      checkoutData.businessName = trimmedBusinessName;
    }

    if (orderType === 'delivery') {
      checkoutData.address = address.trim();
      checkoutData.houseNumber = houseNumber.trim();
      checkoutData.reference = reference.trim();
    }

    onConfirm(checkoutData);
  };

  const handleOrderTypeChange = (type: 'delivery' | 'pickup') => {
    setOrderType(type);
    setErrors({});
    if (type === 'pickup') {
      setAddress('');
      setHouseNumber('');
      setReference('');
    }
  };

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-2xl font-bold text-gray-800">
                    Información del Pedido
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Cerrar formulario"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Tipo de pedido */}
                  <div>
                    <label className="block font-body font-semibold text-gray-800 mb-3">
                      Tipo de Pedido
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOrderTypeChange('pickup')}
                        className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all ${
                          orderType === 'pickup'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 hover:border-primary/50 text-gray-700'
                        }`}
                      >
                        <Store size={20} />
                        <span className="font-body font-semibold">Retiro en Tienda</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOrderTypeChange('delivery')}
                        className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg transition-all ${
                          orderType === 'delivery'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 hover:border-primary/50 text-gray-700'
                        }`}
                      >
                        <Truck size={20} />
                        <span className="font-body font-semibold">Delivery</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* RUC */}
                  <div>
                    <label className="block font-body font-semibold text-gray-800 mb-2">
                      Número de RUC <span className="text-gray-400">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={ruc}
                      onChange={(e) => setRuc(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                      placeholder="Ingrese el RUC"
                    />
                  </div>

                  {/* Razón Social */}
                  <div>
                    <label className="block font-body font-semibold text-gray-800 mb-2">
                      Razón Social <span className="text-gray-400">(Opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-body focus:outline-none focus:border-primary transition-colors"
                      placeholder="Ingrese la razón social"
                    />
                  </div>

                  {/* Campos para delivery */}
                  {orderType === 'delivery' && (
                    <>
                      <div>
                        <label className="block font-body font-semibold text-gray-800 mb-2">
                          Dirección <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:border-primary transition-colors ${
                            errors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Ingrese la dirección"
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-body font-semibold text-gray-800 mb-2">
                          Número de Casa <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={houseNumber}
                          onChange={(e) => setHouseNumber(e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:border-primary transition-colors ${
                            errors.houseNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Ej: 123"
                        />
                        {errors.houseNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.houseNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block font-body font-semibold text-gray-800 mb-2">
                          Referencia <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={reference}
                          onChange={(e) => setReference(e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-lg font-body focus:outline-none focus:border-primary transition-colors resize-none ${
                            errors.reference ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Ej: Frente al supermercado, esquina con..."
                          rows={3}
                        />
                        {errors.reference && (
                          <p className="mt-1 text-sm text-red-500">{errors.reference}</p>
                        )}
                      </div>
                    </>
                  )}

                  {/* Botones */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-body font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-6 py-3 bg-primary hover:bg-opacity-90 text-white font-body font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
                    >
                      Confirmar y Enviar por WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


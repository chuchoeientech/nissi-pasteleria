import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="font-heading text-2xl font-bold text-primary mb-2">
              NISSI
            </h3>
            <p className="font-body text-sm text-gray-600">
              Pastelería artesanal hecha con amor
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
          </div>

          <div className="text-center md:text-right">
            <p className="font-body text-sm text-gray-600 mb-1">
              Consultas y pedidos
            </p>
            <a
              href="https://wa.me/595981234567"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-semibold text-primary hover:text-opacity-80 transition-colors"
            >
              0981-234-567
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="font-body text-xs text-gray-500">
            © 2025 Nissi Pastelería. Desarrollado por <a href="https://eientech.io" target="_blank">eien</a>.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useNavigate } from "react-router-dom";


export default function Header() {
  const { settings, loading } = useSiteSettings();

  return (
    <header className="bg-white shadow-sm py-8">
      <div className="container mx-auto px-4 text-center">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-12 w-32 bg-gray-200 rounded mx-auto mb-2"></div>
            <div className="h-6 w-40 bg-gray-200 rounded mx-auto mt-4"></div>
          </div>
        ) : (
          <>
            {settings?.logo ? (
              <img
                src={settings.logo}
                alt="NISSI pastelería"
                className="h-20 md:h-24 w-auto mx-auto mb-2 object-contain"
              />
            ) : (
              <h1 className="font-heading text-5xl md:text-6xl font-bold text-primary mb-2">
                NISSI
              </h1>
            )}

            <p className="font-body text-sm md:text-base text-gray-500 mt-3 italic">
              {settings?.tagline}
            </p>

            {/* Botón */}
            <div className="flex justify-end mt-4">
              <MiComponente />
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function MiComponente() {
  const navigate = useNavigate();
  return (
    <button
      className="px-4 py-2 bg-primary text-white rounded-full hover:bg-secondary"
      onClick={() => navigate("/")}
    >
      Minorista
    </button>
  );
}

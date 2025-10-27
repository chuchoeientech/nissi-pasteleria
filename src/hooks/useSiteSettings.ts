import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';

interface SiteSettings {
  logo: string | null;
  subtitle: string;
  tagline: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    logo: null,
    subtitle: 'pastelería',
    tagline: 'Pastelería artesanal hecha con amor',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        // Buscar imagen con alt "logo" o la primera imagen disponible
        const query = `*[_type == "imageAsset" && (alt == "logo" || alt match "logo*")][0] {
          image,
          alt,
        }`;
        
        const data = await sanityClient.fetch(query);
        
        if (data?.image) {
          setSettings(prev => ({
            ...prev,
            logo: urlFor(data.image),
          }));
        }
      } catch (error) {
        console.error('Error fetching site settings:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading };
}


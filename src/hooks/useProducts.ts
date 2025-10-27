import { useEffect, useState } from 'react';
import { sanityClient, urlFor } from '../lib/sanity';
import { Product } from '../types';

interface SanityProduct {
  _id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  category: {
    _id: string;
    name: string;
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `*[_type == "product"] | order(name asc) {
          _id,
          name,
          description,
          image,
          price,
          category->{
            _id,
            name
          }
        }`;
        
        const data: SanityProduct[] = await sanityClient.fetch(query);
        
        // Mapear datos de Sanity al formato de la app
        const mappedProducts: Product[] = data.map((item) => ({
          id: item._id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: urlFor(item.image),
          category: item.category.name,
        }));
        
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading };
}


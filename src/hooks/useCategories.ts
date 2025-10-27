import { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity';

export function useCategories() {
  const [categories, setCategories] = useState<string[]>(['Todos']);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const query = `*[_type == "category"] | order(name asc) {
          name
        }`;
        
        const data: { name: string }[] = await sanityClient.fetch(query);
        const categoryNames = data.map((cat) => cat.name);
        
        // Prepend "Todos" al inicio
        setCategories(['Todos', ...categoryNames]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  return { categories };
}


import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Torta Tres Leches',
    description: 'Bizcocho húmedo bañado en tres tipos de leche, cubierto de merengue',
    price: 150000,
    image: 'https://images.pexels.com/photos/4109998/pexels-photo-4109998.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tortas'
  },
  {
    id: '2',
    name: 'Cheesecake Frutos Rojos',
    description: 'Cremoso cheesecake con salsa de frutos rojos naturales',
    price: 120000,
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Postres Fríos'
  },
  {
    id: '3',
    name: 'Brownie',
    description: 'Brownie de chocolate con nueces, intenso y húmedo',
    price: 15000,
    image: 'https://images.pexels.com/photos/4109943/pexels-photo-4109943.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bocaditos Dulces'
  },
  {
    id: '4',
    name: 'Torta Red Velvet',
    description: 'Capas de bizcocho de terciopelo rojo con frosting de queso crema',
    price: 160000,
    image: 'https://images.pexels.com/photos/6605208/pexels-photo-6605208.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tortas'
  },
  {
    id: '5',
    name: 'Tiramisú',
    description: 'Clásico postre italiano con capas de bizcocho, café y mascarpone',
    price: 80000,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Postres Fríos'
  },
  {
    id: '6',
    name: 'Alfajores',
    description: 'Deliciosos alfajores de dulce de leche cubiertos de coco',
    price: 8000,
    image: 'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bocaditos Dulces'
  },
  {
    id: '7',
    name: 'Torta de Zanahoria',
    description: 'Esponjosa torta de zanahoria con frosting de queso crema y nueces',
    price: 140000,
    image: 'https://images.pexels.com/photos/7282166/pexels-photo-7282166.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tortas'
  },
  {
    id: '8',
    name: 'Mousse de Chocolate',
    description: 'Suave y aireado mousse de chocolate belga',
    price: 65000,
    image: 'https://images.pexels.com/photos/4099237/pexels-photo-4099237.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Postres Fríos'
  },
  {
    id: '9',
    name: 'Rosca de Pascua',
    description: 'Tradicional rosca decorada con frutas confitadas',
    price: 95000,
    image: 'https://images.pexels.com/photos/6940976/pexels-photo-6940976.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Especiales de Temporada'
  },
  {
    id: '10',
    name: 'Cookies',
    description: 'Galletas de chocolate chips, crujientes por fuera y suaves por dentro',
    price: 12000,
    image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Bocaditos Dulces'
  },
  {
    id: '11',
    name: 'Panettone',
    description: 'Pan dulce italiano con frutas confitadas y pasas',
    price: 110000,
    image: 'https://images.pexels.com/photos/3992133/pexels-photo-3992133.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Especiales de Temporada'
  },
  {
    id: '12',
    name: 'Flan Casero',
    description: 'Cremoso flan con caramelo casero',
    price: 50000,
    image: 'https://images.pexels.com/photos/9984998/pexels-photo-9984998.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Postres Fríos'
  }
];

export const categories = [
  'Todos',
  'Tortas',
  'Postres Fríos',
  'Bocaditos Dulces',
  'Especiales de Temporada'
];

export interface Product {
  id: number;
  name: string;
  location: string;
  description: string;
  category: string;
  rating: number;
  basePrice: number;
  currency: string;
  images: [string];
}

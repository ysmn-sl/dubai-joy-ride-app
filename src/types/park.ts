export interface Park {
  id: number;
  name: string;
  location: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  images: string[];
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  contact: {
    phone: string;
    email: string;
  };
}

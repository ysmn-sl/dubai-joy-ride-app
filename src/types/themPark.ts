export interface ThemePark {
  id: number;
  name: string;
  location: string;
  description: string;
  category: string;
  basePrice: number;
  currency: string;
  tickets: Ticket[];
  rating: number;
  reviews: number;
  images: string[];
  openingHours: OpeningHours;
  contact: Contact;
}

export interface Ticket {
  id: number;
  type: string;
  price: number;
  currency: string;
  benefits: string[];
}

interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

interface Contact {
  phone: string;
  email: string;
}

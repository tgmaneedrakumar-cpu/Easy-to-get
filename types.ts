
export type View = 'home' | 'sell' | 'chat';

export type UserRole = 'buyer' | 'seller';

export interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  seller: string;
  imageUrl: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
}


import { useState } from 'react';
import type { FoodItem } from '../types';

const initialFoodItems: FoodItem[] = [
  {
    id: 1,
    name: "Gourmet Burger",
    description: "Juicy beef patty with cheddar cheese, fresh lettuce, and our secret sauce.",
    price: 12.99,
    seller: "Burger Queen",
    imageUrl: "https://picsum.photos/seed/burger/600/400",
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, San Marzano tomatoes, and basil.",
    price: 15.50,
    seller: "Pizza Palace",
    imageUrl: "https://picsum.photos/seed/pizza/600/400",
  },
  {
    id: 3,
    name: "Fresh Sushi Platter",
    description: "A delicious assortment of fresh tuna, salmon, and shrimp nigiri.",
    price: 22.00,
    seller: "Sushi Spot",
    imageUrl: "https://picsum.photos/seed/sushi/600/400",
  },
  {
    id: 4,
    name: "Vegan Buddha Bowl",
    description: "A healthy and vibrant bowl of quinoa, roasted vegetables, and avocado.",
    price: 14.75,
    seller: "Green Bites",
    imageUrl: "https://picsum.photos/seed/vegan/600/400",
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Decadent chocolate cake with a molten chocolate center, served warm.",
    price: 8.50,
    seller: "Sweet Treats",
    imageUrl: "https://picsum.photos/seed/cake/600/400",
  },
  {
    id: 6,
    name: "Spicy Ramen",
    description: "Rich pork broth with chewy noodles, tender chashu, and a soft-boiled egg.",
    price: 16.00,
    seller: "Noodle House",
    imageUrl: "https://picsum.photos/seed/ramen/600/400",
  }
];

export const useFoodData = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems);

  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...item,
      id: Date.now(), // simple unique id
    };
    setFoodItems(prevItems => [newItem, ...prevItems]);
  };

  return { foodItems, addFoodItem };
};

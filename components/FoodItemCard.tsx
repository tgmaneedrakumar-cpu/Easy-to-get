
import React from 'react';
import type { FoodItem } from '../types';

interface FoodItemCardProps {
  item: FoodItem;
  onAddToCart: (item: FoodItem) => void;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1">by {item.seller}</p>
        <p className="text-gray-600 mt-2 flex-grow">{item.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-orange-500">${item.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(item)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

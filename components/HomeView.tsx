
import React, { useState, useEffect } from 'react';
import type { FoodItem } from '../types';
import { FoodItemCard } from './FoodItemCard';
import { generateFoodRecommendations } from '../services/geminiService';

interface HomeViewProps {
  foodItems: FoodItem[];
  onAddToCart: (item: FoodItem) => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
);

export const HomeView: React.FC<HomeViewProps> = ({ foodItems, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const fetchRecommendations = async () => {
    setIsLoadingRecs(true);
    const recs = await generateFoodRecommendations();
    setRecommendations(recs);
    setIsLoadingRecs(false);
  };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchRecommendations();
  }, []);

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.seller.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Discover Delicious Food</h1>
        <p className="mt-2 text-gray-600">Order from the best local cooks and producers.</p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search for dishes, sellers, or keywords..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">AI Recommendations</h2>
          <button 
            onClick={fetchRecommendations} 
            disabled={isLoadingRecs}
            className="text-sm font-medium text-orange-500 hover:text-orange-600 disabled:opacity-50"
          >
            {isLoadingRecs ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        <div className="mt-4 text-gray-600">
          {isLoadingRecs ? <LoadingSpinner /> : (
            <ul className="space-y-2 list-disc list-inside">
              {recommendations.map((rec, index) => (
                <li key={index} className="text-gray-700">{rec.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">All Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.length > 0 ? (
            filteredFoodItems.map(item => (
              <FoodItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No items match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

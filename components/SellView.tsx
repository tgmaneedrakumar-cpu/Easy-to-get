
import React, { useState } from 'react';
import type { FoodItem } from '../types';
import { identifyFoodFromImage } from '../services/geminiService';

interface SellViewProps {
  onAddFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  onListingCreated: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
    </div>
);

export const SellView: React.FC<SellViewProps> = ({ onAddFoodItem, onListingCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [seller, setSeller] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAiError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageBase64(result.split(',')[1]);
        setImageMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiAssist = async () => {
    if (!imageBase64 || !imageMimeType) {
      setAiError("Please upload an image first.");
      return;
    }
    setIsProcessing(true);
    setAiError(null);
    const { name: aiName, description: aiDescription } = await identifyFoodFromImage(imageBase64, imageMimeType);
    if(aiName || aiDescription) {
        setName(aiName);
        setDescription(aiDescription);
    } else {
        setAiError("AI could not identify the food. Please fill details manually.");
    }
    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !seller || !imagePreview) {
        alert("Please fill out all fields and upload an image.");
        return;
    }
    onAddFoodItem({
      name,
      description,
      price: parseFloat(price),
      seller,
      imageUrl: imagePreview,
    });
    onListingCreated();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Food Image
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
              ) : (
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <div className="flex text-sm text-gray-600 justify-center">
                <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                  <span>Upload a file</span>
                  <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        {imagePreview && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleAiAssist}
              disabled={isProcessing}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
              {isProcessing ? <LoadingSpinner /> : '✨ Auto-fill with AI'}
            </button>
            {aiError && <p className="text-red-500 text-sm mt-2">{aiError}</p>}
          </div>
        )}

        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Food Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"></textarea>
        </div>
        <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
        </div>
        <div>
            <label htmlFor="seller" className="block text-sm font-medium text-gray-700">Your Name / Restaurant Name</label>
            <input type="text" id="seller" value={seller} onChange={(e) => setSeller(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

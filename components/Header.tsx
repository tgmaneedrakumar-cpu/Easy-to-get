
import React from 'react';
import type { View, UserRole } from '../types';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setView: (view: View) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const ShoppingBagIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
  </svg>
);


export const Header: React.FC<HeaderProps> = ({ userRole, setUserRole, setView, cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
          <span className="text-2xl font-bold text-orange-500">FoodHub</span>
          <span role="img" aria-label="food emoji">🍜</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setView('home')} className="text-gray-600 hover:text-orange-500 font-medium">Browse</button>
            {userRole === 'seller' && (
              <button onClick={() => setView('sell')} className="text-gray-600 hover:text-orange-500 font-medium">Sell Food</button>
            )}
            <button onClick={() => setView('chat')} className="text-gray-600 hover:text-orange-500 font-medium">AI Chat</button>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
            <button 
              onClick={() => setUserRole('buyer')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${userRole === 'buyer' ? 'bg-orange-500 text-white shadow' : 'text-gray-600'}`}>
              Buyer
            </button>
            <button 
              onClick={() => setUserRole('seller')}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${userRole === 'seller' ? 'bg-orange-500 text-white shadow' : 'text-gray-600'}`}>
              Seller
            </button>
          </div>

          <button onClick={onCartClick} className="relative text-gray-600 hover:text-orange-500">
            <ShoppingBagIcon className="h-7 w-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

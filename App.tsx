
import React, { useState, useMemo } from 'react';
import { HomeView } from './components/HomeView';
import { SellView } from './components/SellView';
import { ChatView } from './components/ChatView';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import type { View, UserRole, FoodItem, CartItem } from './types';
import { useFoodData } from './hooks/useFoodData';
import { Cart } from './components/Cart';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [userRole, setUserRole] = useState<UserRole>('buyer');
  const { foodItems, addFoodItem } = useFoodData();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item: FoodItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };
  
  const handleRemoveFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
         return prevCart.map(cartItem =>
          cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const renderView = () => {
    switch (view) {
      case 'home':
        return <HomeView foodItems={foodItems} onAddToCart={handleAddToCart} />;
      case 'sell':
        return <SellView onAddFoodItem={addFoodItem} onListingCreated={() => setView('home')} />;
      case 'chat':
        return <ChatView />;
      default:
        return <HomeView foodItems={foodItems} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header
        userRole={userRole}
        setUserRole={setUserRole}
        setView={setView}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />
      <main className="pb-20 pt-16 md:pb-5">
        <div className="container mx-auto px-4 py-8">
          {renderView()}
        </div>
      </main>
      <BottomNav currentView={view} setView={setView} userRole={userRole} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;

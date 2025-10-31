
import React from 'react';
import type { View, UserRole } from '../types';

interface BottomNavProps {
  currentView: View;
  setView: (view: View) => void;
  userRole: UserRole;
}

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const SellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4zm6 4h-2v-1c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v1H4v-1c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v1z" /><path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" transform="translate(0 -2)"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14" transform="scale(0.8) translate(2, 2)" visibility="hidden"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v12a2 2 0 01-2 2z" transform="translate(0 -1)" visibility="hidden"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, userRole }) => {
  const navItems = [
    { view: 'home', label: 'Browse', icon: <HomeIcon /> },
    ...(userRole === 'seller' ? [{ view: 'sell' as View, label: 'Sell', icon: <SellIcon /> }] : []),
    { view: 'chat', label: 'AI Chat', icon: <ChatIcon /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`flex flex-col items-center justify-center w-full pt-2 pb-1 text-sm transition-colors duration-200 ${
              currentView === item.view ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

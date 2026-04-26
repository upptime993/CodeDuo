import { Home, ShoppingBag, Stars, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'super', label: 'Super', icon: Stars },
    { id: 'profile', label: 'You', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-6 bg-[#22283A]/90 backdrop-blur-md rounded-t-[32px] border-t border-[#2E3650] shadow-[0_-4px_12px_rgba(0,0,0,0.25)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-150 relative ${
              isActive ? 'text-brand-secondary' : 'text-[#B9C2D9]'
            }`}
          >
            <Icon size={24} className={`mb-1 transition-transform ${isActive ? 'fill-current' : ''}`} />
            <span className="font-label text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-2 w-1.5 h-1.5 bg-brand-secondary rounded-full"
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

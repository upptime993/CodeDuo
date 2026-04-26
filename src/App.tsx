import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import LessonView from './views/LessonView';
import SplashView from './views/SplashView';
import AdminView from './views/AdminView';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [onboarding, setOnboarding] = useState(true);
  const [isLessonActive, setIsLessonActive] = useState(false);
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);

  if (onboarding) {
    return <SplashView onStart={() => setOnboarding(false)} />;
  }

  if (isLessonActive && activeLevelId) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="lesson"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed inset-0 z-[100]"
        >
          <LessonView levelId={activeLevelId} onExit={() => setIsLessonActive(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav xp={1250} energy={12} />
      
      <main className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const button = target.closest('button');
                if (button && button.dataset.levelId) {
                  setActiveLevelId(button.dataset.levelId);
                  setIsLessonActive(true);
                }
              }}
            >
              <HomeView />
            </motion.div>
          )}
          {currentTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProfileView />
            </motion.div>
          )}
          {currentTab === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AdminView />
            </motion.div>
          )}
          {currentTab === 'super' && (
            <motion.div
              key="super"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-[calc(100vh-160px)] px-10 text-center"
            >
              <div className="bg-brand-tertiary/20 p-8 rounded-full mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                >
                  <Stars className="text-brand-tertiary w-16 h-16" fill="currentColor" />
                </motion.div>
              </div>
              <h1 className="text-2xl font-extrabold mb-4">Super Quest</h1>
              <p className="text-slate-400 mb-8 max-w-xs">Fitur premium akan datang!</p>
              <button 
                onClick={() => setCurrentTab('home')}
                className="squishy-btn-lime px-8 py-4 rounded-2xl font-bold"
              >
                Kembali
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <BottomNav activeTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

// Simple fallback for the Stars icon if lucide-react isn't fully loaded in thought
function Stars({ className, ...props }: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  );
}


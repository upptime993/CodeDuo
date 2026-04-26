import { Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function SplashView({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-brand-background text-on-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-brand-surface to-brand-background">
      {/* Decorative ambient background glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[300px] h-[300px] bg-brand-primary-container rounded-full blur-[100px]"></div>
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-10 py-12 flex flex-col items-center text-center h-full min-h-screen justify-between"
      >
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {/* Mascot Illustration Placeholder */}
          <div className="mb-8 w-56 h-56 rounded-full bg-brand-surface-high flex items-center justify-center overflow-hidden shadow-2xl border-4 border-[#2E3650] relative">
            <img 
              src="https://api.dicebear.com/7.x/bottts/svg?seed=Mascot" 
              alt="Mascot" 
              className="w-full h-full p-6 animate-pulse"
            />
          </div>
          
          <h1 className="font-display font-extrabold text-3xl text-white mb-4 leading-tight">
            Turn learning<br />into a game
          </h1>
          <p className="text-slate-400 max-w-[280px]">
            Master Python, JavaScript, and more through interactive challenges and daily quests.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4 mt-auto">
          <button 
            onClick={onStart}
            className="w-full squishy-btn-pink py-5 rounded-2xl font-bold flex items-center justify-center gap-2 group"
          >
            <span>Get started</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="w-full py-4 text-brand-primary font-bold text-sm hover:opacity-80 transition-opacity">
            I already have an account
          </button>
        </div>
      </motion.main>
    </div>
  );
}

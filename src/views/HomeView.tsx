import { Star, BookOpen, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function HomeView() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chaptersRes = await fetch('/api/chapters');
        const chaptersData = await chaptersRes.json();
        setChapters(chaptersData);

        if (chaptersData.length > 0) {
          const firstChapter = chaptersData[0];
          const levelsRes = await fetch(`/api/chapters/${firstChapter._id}/levels`);
          const levelsData = await levelsRes.json();
          setLevels(levelsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="mt-20 text-center text-white font-bold">Memuat...</div>;
  }

  if (chapters.length === 0) {
    return <div className="mt-20 text-center text-slate-400">Belum ada materi. Gunakan Admin Dashboard untuk mengimpor data.</div>;
  }

  const currentChapter = chapters[0]; // For now, just show the first chapter

  // Alternate node offsets for a curved path look
  const getOffset = (index: number) => {
    const offsets = ['-ml-[60px]', 'ml-[40px]', 'ml-[-20px]', 'ml-[50px]', 'ml-[-40px]'];
    return offsets[index % offsets.length];
  };

  return (
    <div className="mt-20 px-5 max-w-lg mx-auto flex flex-col gap-10 pb-32">
      {/* Chapter Card */}
      <section className="bg-brand-primary rounded-[24px] p-6 shadow-[0_8px_0_0_#86ab4b] flex flex-col gap-2 relative overflow-hidden">
        <div>
          <h2 className="font-display font-bold text-xs text-brand-on-primary opacity-60 uppercase tracking-widest">BAB {currentChapter.order}</h2>
          <p className="font-display font-extrabold text-xl text-brand-on-primary">{currentChapter.title}</p>
          <p className="text-sm text-brand-on-primary opacity-80 mt-1">{currentChapter.description}</p>
        </div>
        <div className="w-full bg-brand-on-primary/10 rounded-full h-3 mt-4">
          <div className="bg-brand-on-primary h-3 rounded-full w-0"></div>
        </div>
      </section>

      {/* Progression Path */}
      <section className="relative flex flex-col items-center gap-16 py-8 w-full">
        {/* Path SVG */}
        <svg className="absolute top-0 w-12 h-full z-0 text-[#2E3650] left-1/2 -ml-6" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" viewBox="0 0 48 800" preserveAspectRatio="none">
          <path d="M 24 0 Q 48 100 24 200 T 24 400 T 24 600 T 24 800" />
        </svg>

        {levels.map((level, i) => {
          const isFirst = i === 0; // Simulate progress by making first one active
          return (
            <div key={level._id} className={`relative z-10 ${getOffset(i)}`}>
              {isFirst && (
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black font-label text-[10px] px-4 py-2 rounded-xl shadow-lg after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2 after:border-t-8 after:border-t-white after:border-l-8 after:border-l-transparent after:border-r-8 after:border-r-transparent"
                >
                  MULAI
                </motion.div>
              )}

              <button
                data-level-id={level._id}
                className={`
                w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95
                ${isFirst ? 'bg-brand-surface-highest ring-4 ring-brand-primary ring-offset-4 ring-offset-brand-background shadow-[0_6px_0_0_#22283A] active:translate-y-[6px] active:shadow-none' :
                  'bg-brand-surface-highest shadow-[0_6px_0_0_#22283A] active:translate-y-[6px] active:shadow-none hover:ring-2 hover:ring-slate-500'}
              `}>
                {level.type === 'material' ? (
                  <BookOpen size={32} className={isFirst ? 'text-brand-primary' : 'text-slate-400'} />
                ) : (
                  <Star size={32} className={isFirst ? 'text-brand-primary' : 'text-slate-400'} />
                )}
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
}

import { X, Heart, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export default function LessonView({ levelId, onExit }: { levelId: string, onExit: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`/api/levels/${levelId}/content`);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching lesson content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [levelId]);

  if (loading) {
    return <div className="bg-brand-background min-h-screen flex items-center justify-center font-bold text-white">Memuat Pelajaran...</div>;
  }

  if (!data || !data.level) {
    return <div className="bg-brand-background min-h-screen flex items-center justify-center text-red-500 font-bold">Pelajaran tidak ditemukan.</div>;
  }

  const isMaterial = data.level.type === 'material';
  const isQuiz = data.level.type === 'quiz';

  const handleCheck = () => {
    if (isQuiz) {
      if (selected === data.content.correctAnswer) {
        setStatus('correct');
      } else {
        setStatus('wrong');
      }
    } else {
      // Just complete material
      setStatus('correct');
    }
  };

  return (
    <div className="bg-brand-background min-h-screen flex flex-col font-body">
      {/* Header */}
      <header className="w-full pt-8 pb-4 px-5 sticky top-0 bg-brand-background/90 backdrop-blur-md z-50 flex items-center gap-4">
        <button onClick={onExit} className="text-slate-400 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="flex-1 bg-brand-surface-high h-3 rounded-full overflow-hidden border border-[#2E3650]">
          <div className="bg-brand-primary h-full w-[10%] rounded-full relative shadow-[0_0_8px_rgba(195,243,119,0.5)]"></div>
        </div>
        <div className="flex items-center gap-1 text-brand-secondary font-bold">
          <Heart size={20} fill="currentColor" />
          <span>5</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full flex flex-col gap-8">
        {isMaterial && (
          <section className="flex flex-col gap-6">
            <h1 className="font-display font-extrabold text-2xl">{data.level.title}</h1>
            <div
              className="prose prose-invert max-w-none text-slate-300 bg-[#1C2230] p-6 rounded-2xl border border-[#2E3650] shadow-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.content.content }}
            />
          </section>
        )}

        {isQuiz && (
          <>
            <section className="flex flex-col gap-6">
              <h1 className="font-display font-extrabold text-2xl">{data.level.title}</h1>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 shrink-0 bg-[#22283A] rounded-2xl overflow-hidden border-2 border-[#2E3650] shadow-lg flex items-center justify-center p-2">
                  <img src="https://api.dicebear.com/7.x/bottts/svg?seed=TeacherBot" alt="Bot" className="w-full h-full" />
                </div>
                <div className="relative bg-[#22283A] border-2 border-[#2E3650] rounded-2xl rounded-tl-none p-4 shadow-lg flex-1">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#22283A] border-l-2 border-t-2 border-[#2E3650] transform rotate-[-45deg] origin-top-right"></div>
                  <p className="text-sm font-medium leading-relaxed">
                    {data.content.question}
                  </p>
                </div>
              </div>
            </section>

            {/* Options */}
            <section className="flex flex-col gap-3 mt-4">
              {data.content.options.map((opt: string) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSelected(opt);
                    setStatus('idle'); // Reset status on select
                  }}
                  className={`
                    w-full text-left px-6 py-4 rounded-xl font-bold text-lg border-2 transition-all active:scale-95
                    ${selected === opt ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' : 'bg-[#22283A] border-[#2E3650] text-white hover:border-[#3D4866]'}
                    shadow-[0_4px_0_0_#151A26] active:translate-y-1 active:shadow-none
                  `}
                >
                  {opt}
                </button>
              ))}
            </section>
          </>
        )}
      </main>

      {/* Footer CTA */}
      <footer className={`p-5 border-t pb-safe transition-colors ${status === 'correct' ? 'bg-brand-primary/20 border-brand-primary' : status === 'wrong' ? 'bg-red-500/20 border-red-500' : 'bg-brand-background border-[#2E3650]'}`}>
        {status === 'correct' && (
          <div className="mb-4 flex items-center gap-2 text-brand-primary font-bold">
            <CheckCircle size={24} />
            <span>Jawaban kamu benar!</span>
          </div>
        )}
        {status === 'wrong' && (
          <div className="mb-4 flex items-center gap-2 text-red-500 font-bold">
            <X size={24} />
            <span>Kurang tepat. Coba lagi ya!</span>
          </div>
        )}

        <button 
          onClick={status === 'correct' ? onExit : handleCheck}
          disabled={isQuiz && !selected}
          className={`
            w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all
            ${isQuiz && !selected ? 'bg-[#22283A] text-slate-500 cursor-not-allowed opacity-50' :
              status === 'correct' ? 'squishy-btn-lime text-black' : 'squishy-btn-lime text-black opacity-100'}
          `}
        >
          {status === 'correct' ? 'Lanjut' : isMaterial ? 'Selesai Baca' : 'Cek'}
        </button>
      </footer>
    </div>
  );
}

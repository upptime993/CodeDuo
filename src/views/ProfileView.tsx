import { Code, Settings, Zap, Flame, Trophy, ChevronRight, Stars } from 'lucide-react';

export default function ProfileView() {
  const achievements = [
    { title: 'Fast Learner', desc: 'Complete 5 lessons in under 10 mins.', icon: Stars, level: 'Lvl 3', color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
    { title: '7-Day Streak', desc: 'Code every day for a week.', icon: Flame, level: null, color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
    { title: 'Code Master', desc: 'Score 100% on a major project.', icon: Trophy, level: null, color: 'text-brand-tertiary', bg: 'bg-brand-tertiary/10' },
  ];

  return (
    <div className="flex-1 pb-32">
      <header className="flex justify-between items-center w-full sticky top-0 z-50 h-16 px-5 bg-[#151A26]/90 backdrop-blur-md border-b border-[#2E3650]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#22283A] border border-[#2E3650] overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Alex Dev</h2>
            <p className="font-mono text-[10px] text-brand-primary">Level 12 Coder</p>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-[#22283A] border border-[#2E3650] flex items-center justify-center hover:bg-[#2E3650] active:scale-95 transition-all">
          <Settings size={20} />
        </button>
      </header>

      <main className="px-5 py-6 flex flex-col gap-8 max-w-3xl mx-auto w-full">
        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-[#22283A] border border-[#2E3650] rounded-xl p-4 flex flex-col gap-1 active:translate-y-1 transition-all">
            <div className="flex items-center gap-2 text-brand-primary">
              <Zap size={16} fill="currentColor" />
              <span className="font-label text-[10px] uppercase text-slate-400">Total XP</span>
            </div>
            <div className="font-display font-extrabold text-2xl text-brand-primary">1,250</div>
            <p className="font-mono text-[10px] text-slate-400">+50 today</p>
          </div>

          <div className="bg-[#22283A] border border-[#2E3650] rounded-xl p-4 flex flex-col gap-1 active:translate-y-1 transition-all">
            <div className="flex items-center gap-2 text-brand-secondary">
              <Flame size={16} fill="currentColor" />
              <span className="font-label text-[10px] uppercase text-slate-400">Day Streak</span>
            </div>
            <div className="font-display font-extrabold text-2xl text-brand-secondary">7</div>
            <p className="font-mono text-[10px] text-slate-400">Personal best!</p>
          </div>

          <div className="col-span-2 bg-[#22283A] border border-[#2E3650] rounded-xl p-4 flex items-center justify-between active:translate-y-1 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                <Trophy size={24} className="text-[#151A26]" fill="currentColor" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Gold League</h3>
                <p className="text-[11px] text-slate-400">Top 15% this week</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-slate-400" />
          </div>
        </section>

        {/* Quest Progress */}
        <section className="bg-[#22283A] border border-[#2E3650] rounded-xl p-5 flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-sm font-bold">Quests Progress</h3>
              <p className="text-[11px] text-slate-400">Weekly goals</p>
            </div>
            <span className="font-mono text-brand-tertiary">80%</span>
          </div>
          <div className="h-3 w-full bg-[#151A26] rounded-full overflow-hidden border border-[#2E3650]">
            <div className="h-full bg-gradient-to-r from-brand-tertiary to-brand-tertiary/70 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <p className="font-mono text-[10px] text-center text-slate-400">Complete 1 more lesson to reach 100%</p>
        </section>

        {/* Achievements */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Achievements</h2>
            <button className="font-label text-[10px] text-brand-primary uppercase">View All</button>
          </div>
          <div className="flex flex-col gap-3">
            {achievements.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="bg-[#22283A] border border-[#2E3650] border-b-4 rounded-xl p-4 flex items-center gap-4 hover:border-b-2 active:border-b-0 active:translate-y-1 transition-all">
                  <div className={`w-12 h-12 rounded-full ${a.bg} flex items-center justify-center ${a.color}`}>
                    <Icon size={24} fill="currentColor" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-sm">{a.title}</h3>
                      {a.level && <span className={`font-bold text-[10px] uppercase ${a.color}`}>{a.level}</span>}
                    </div>
                    <p className="text-[11px] text-slate-400">{a.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

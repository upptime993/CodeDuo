import { Stars, CheckCircle2, Diamond } from 'lucide-react';

export default function ShopView() {
  const packs = [
    { title: 'Handful', amount: '500', price: '$4.99', popular: false },
    { title: 'Pouch', amount: '1,200', price: '$9.99', popular: true },
    { title: 'Chest', amount: '2,500', price: '$19.99', popular: false },
    { title: 'Mountain', amount: '6,500', price: '$49.99', popular: false, bestValue: true },
  ];

  return (
    <div className="pt-20 px-5 max-w-2xl mx-auto flex flex-col gap-8 pb-32">
      <div className="text-center">
        <h1 className="font-display font-extrabold text-3xl mb-2">Shop</h1>
        <p className="text-sm text-slate-400">Power up your coding journey.</p>
      </div>

      {/* Super Banner */}
      <section className="bg-brand-tertiary rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_8px_0_0_#732ab1] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-brand-on-tertiary text-brand-tertiary rounded-full p-2 flex items-center justify-center">
              <Stars size={24} fill="currentColor" />
            </div>
            <h2 className="font-extrabold text-2xl text-brand-on-tertiary">Super</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {[ 'Unlimited energy', 'Ad-free learning', 'Personalized Practice'].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-brand-on-tertiary/90 text-sm font-medium">
                <CheckCircle2 size={16} fill="currentColor" className="text-brand-on-tertiary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <button className="z-10 bg-brand-on-tertiary text-brand-tertiary font-bold py-4 px-8 rounded-2xl shadow-[0_4px_0_0_#4a0080] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#4a0080] active:translate-y-[4px] active:shadow-none transition-all w-full sm:w-auto uppercase tracking-widest text-xs">
          Get Super for $9.99/mo
        </button>
      </section>

      {/* Gems Section */}
      <section className="flex flex-col gap-6 mt-4">
        <h3 className="font-bold text-xl flex items-center gap-2">
          <Diamond size={24} className="text-brand-secondary" fill="currentColor" />
          Gems
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {packs.map((pack, i) => (
            <div key={i} className="bg-[#22283A] rounded-[20px] p-5 flex flex-col items-center gap-4 text-center border-2 border-transparent hover:border-brand-primary transition-colors relative group">
              {pack.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                  <span className="bg-brand-secondary text-brand-on-secondary text-[10px] font-bold uppercase py-1 px-3 rounded-full shadow-lg">Most Popular</span>
                </div>
              )}
              {pack.bestValue && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                  <span className="bg-brand-primary text-brand-on-primary text-[10px] font-bold uppercase py-1 px-3 rounded-full shadow-lg">Best Value</span>
                </div>
              )}
              
              <div className="w-20 h-20 flex items-center justify-center relative mb-2">
                <Diamond size={48} className="text-brand-primary drop-shadow-[0_0_12px_rgba(195,243,119,0.3)]" fill="currentColor" />
                {pack.amount > 1000 && <Diamond size={32} className="text-brand-primary absolute -bottom-2 -right-2 brightness-75" fill="currentColor" />}
              </div>

              <div className="flex flex-col gap-1 w-full">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">{pack.title}</span>
                <span className="font-extrabold text-lg text-brand-primary">{pack.amount} Gems</span>
              </div>

              <button className="w-full squishy-btn-pink py-3 font-bold rounded-xl text-sm">
                {pack.price}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

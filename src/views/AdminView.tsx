import { useState } from 'react';
import { Upload, Database } from 'lucide-react';

export default function AdminView() {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    try {
      setIsLoading(true);
      setStatus({ type: '', message: '' });

      const parsedData = JSON.parse(jsonInput);

      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        throw new Error('Failed to import data');
      }

      setStatus({ type: 'success', message: 'Data imported successfully!' });
      setJsonInput('');
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Invalid JSON or import failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 px-5 max-w-2xl mx-auto flex flex-col gap-8 pb-32">
      <section className="bg-brand-surface-high rounded-2xl p-6 border border-[#2E3650] shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Database className="text-brand-primary" size={28} />
          <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-slate-200">Import Learning Material (JSON)</h2>
          <p className="text-sm text-slate-400">
            Paste your generated JSON here to populate Chapters, Levels, and Quizzes.
          </p>

          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{"chapters": [...]}'
            className="w-full h-64 bg-[#1C2230] border border-[#2E3650] rounded-xl p-4 text-slate-300 font-mono text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-y"
          />

          {status.message && (
            <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {status.message}
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={isLoading || !jsonInput.trim()}
            className={`flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all
              ${isLoading || !jsonInput.trim() ? 'bg-[#22283A] text-slate-500 cursor-not-allowed opacity-50' : 'squishy-btn-lime opacity-100'}
            `}
          >
            <Upload size={20} />
            {isLoading ? 'Importing...' : 'Import JSON'}
          </button>
        </div>
      </section>
    </div>
  );
}

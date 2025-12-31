
import React, { useState, useEffect } from 'react';

const ResolutionsBoard: React.FC = () => {
  const [resolutions, setResolutions] = useState<string[]>(() => {
    const saved = localStorage.getItem('resolutions');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('resolutions', JSON.stringify(resolutions));
  }, [resolutions]);

  const addResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && resolutions.length < 5) {
      setResolutions([...resolutions, input.trim()]);
      setInput('');
    }
  };

  const removeResolution = (index: number) => {
    setResolutions(resolutions.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-full backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-list-check text-yellow-500"></i>
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Mis Metas 2026</h3>
        </div>
        <span className="text-[9px] text-zinc-600 font-bold">{resolutions.length}/5</span>
      </div>

      <div className="space-y-3 mb-6">
        {resolutions.length === 0 ? (
          <p className="text-xs text-zinc-600 italic py-4 text-center">Aún no has escrito tus propósitos para este gran año...</p>
        ) : (
          resolutions.map((res, i) => (
            <div key={i} className="flex items-center justify-between bg-black/30 border border-zinc-800/50 p-3 rounded-xl group transition-all hover:border-yellow-500/30">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-zinc-300 font-medium">{res}</span>
              </div>
              <button 
                onClick={() => removeResolution(i)}
                className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-500 transition-all"
              >
                <i className="fa-solid fa-xmark text-[10px]"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {resolutions.length < 5 && (
        <form onSubmit={addResolution} className="flex gap-2">
          <input 
            type="text" 
            placeholder="Nuevo propósito..."
            className="flex-1 bg-black/50 border border-zinc-800 rounded-lg px-4 py-2 text-xs outline-none focus:border-yellow-500 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="bg-zinc-800 hover:bg-zinc-700 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all">
            <i className="fa-solid fa-plus text-xs"></i>
          </button>
        </form>
      )}
    </div>
  );
};

export default ResolutionsBoard;

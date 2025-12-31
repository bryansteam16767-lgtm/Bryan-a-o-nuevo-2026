
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const AiPersonalToast: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState('');
  const [name, setName] = useState('');

  const generateToast = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Escribe un brindis de Año Nuevo 2026 breve, inspirador y épico para una persona llamada ${name || 'mi amigo'}. Que sea optimista y con un toque de elegancia. Máximo 60 palabras.`,
      });
      setToast(response.text || '');
    } catch (e) {
      setToast("¡Por un 2026 lleno de éxitos y nuevas aventuras! ¡Salud!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 h-full flex flex-col justify-between backdrop-blur-md">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <i className="fa-solid fa-glass-cheers text-yellow-500"></i>
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Brindis Personalizado IA</h3>
        </div>
        
        {toast ? (
          <div className="animate-fadeIn">
            <p className="text-sm italic text-zinc-300 leading-relaxed mb-6 font-serif">
              "{toast}"
            </p>
            <button 
              onClick={() => setToast('')}
              className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest hover:underline"
            >
              Generar otro
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="¿Para quién es el brindis?"
              className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-xs outline-none focus:border-yellow-500 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button 
              onClick={generateToast}
              disabled={isGenerating}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 rounded-lg text-[10px] uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Preparando Copas...' : 'Generar Brindis de Gala'}
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-zinc-800/50">
        <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-tighter">Powered by Gemini AI Engine</p>
      </div>
    </div>
  );
};

export default AiPersonalToast;

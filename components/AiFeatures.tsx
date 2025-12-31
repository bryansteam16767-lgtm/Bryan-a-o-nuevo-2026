
import React, { useState, useRef } from 'react';
import { GeminiService } from '../services/geminiService';

const AiFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trivia' | 'image' | 'video'>('trivia');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  const [triviaResult, setTriviaResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [imageResult, setImageResult] = useState<string | null>(null);
  const [videoResult, setVideoResult] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const gemini = GeminiService.getInstance();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        setImageResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrivia = async () => {
    if (!input) return;
    setLoading(true);
    setLoadingMessage('CONSULTANDO NÚCLEO...');
    const res = await gemini.getNewYearTrivia(input);
    setTriviaResult(res);
    setLoading(false);
  };

  const handleFestify = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setLoadingMessage('PROCESANDO PIXELES...');
    const base64 = selectedFile.split(',')[1];
    const result = await gemini.editImage(base64, "add golden fireworks and 2026 party atmosphere");
    setImageResult(result);
    setLoading(false);
  };

  const handleGenerateVideo = async () => {
    if (!input) return;
    setLoading(true);
    setLoadingMessage('RENDERIZANDO VEO...');
    const result = await gemini.generateVeoVideo(`Cinematic 2026 countdown, ${input}, fireworks`);
    setVideoResult(result);
    setLoading(false);
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden backdrop-blur-md max-w-4xl mx-auto shadow-2xl">
      <div className="flex border-b border-zinc-800 text-[10px] font-bold uppercase tracking-widest">
        <button 
          onClick={() => setActiveTab('trivia')} 
          className={`flex-1 py-4 transition-colors ${activeTab === 'trivia' ? 'bg-yellow-500 text-black shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <i className="fa-solid fa-magnifying-glass mr-2"></i> Noticias Globales
        </button>
        <button 
          onClick={() => setActiveTab('image')} 
          className={`flex-1 py-4 transition-colors ${activeTab === 'image' ? 'bg-yellow-500 text-black shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <i className="fa-solid fa-camera mr-2"></i> Editor Festivo
        </button>
        <button 
          onClick={() => setActiveTab('video')} 
          className={`flex-1 py-4 transition-colors ${activeTab === 'video' ? 'bg-yellow-500 text-black shadow-inner' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          <i className="fa-solid fa-video mr-2"></i> Generador VEO
        </button>
      </div>

      <div className="p-6 min-h-[220px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-10 h-10 border-[3px] border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-yellow-500 text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">{loadingMessage}</p>
          </div>
        ) : (
          <div className="animate-fadeIn">
            {activeTab === 'trivia' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    type="text" placeholder="Ingresa una ciudad o país para ver sus planes 2026..."
                    className="bg-black/50 border border-zinc-800 rounded px-4 py-2.5 text-xs flex-1 focus:outline-none focus:border-yellow-500 transition-all text-zinc-300"
                    value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrivia()}
                  />
                  <button onClick={handleTrivia} className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-2.5 rounded text-[10px] transition-all uppercase tracking-widest">Consultar</button>
                </div>
                {triviaResult && (
                  <div className="text-xs text-zinc-400 leading-relaxed bg-black/40 p-4 rounded-lg border border-zinc-800 max-h-52 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center gap-2 mb-2 text-yellow-500/70">
                      <i className="fa-solid fa-circle-info text-[10px]"></i>
                      <span className="text-[9px] font-bold uppercase tracking-widest">Informe Gemini AI</span>
                    </div>
                    {triviaResult.text}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'image' && (
              <div className="flex flex-col items-center space-y-4">
                {!selectedFile ? (
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="w-full h-32 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-[10px] text-zinc-500 font-bold uppercase hover:bg-zinc-800/30 hover:border-zinc-700 transition-all group"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-lg mb-2 group-hover:scale-110 transition-transform"></i>
                    Sube una foto para celebrarla
                  </button>
                ) : (
                  <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                    <div className="relative w-full max-w-[240px] aspect-video">
                      <img src={selectedFile} className="w-full h-full object-cover rounded-lg border border-zinc-800 grayscale opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white bg-black/50 px-2 py-1 rounded uppercase tracking-widest">Original</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center justify-center">
                      {!imageResult ? (
                        <button 
                          onClick={handleFestify} 
                          className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-black py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-yellow-500/20 uppercase tracking-widest"
                        >
                          <i className="fa-solid fa-wand-magic-sparkles mr-2"></i> Festificar Imagen
                        </button>
                      ) : (
                        <div className="w-full relative animate-fadeIn">
                          <img src={imageResult} className="w-full rounded-lg border-2 border-yellow-500 shadow-xl shadow-yellow-500/10" />
                          <button 
                            onClick={() => {setSelectedFile(null); setImageResult(null);}} 
                            className="absolute -top-2 -right-2 bg-zinc-900 text-white w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center text-[8px] hover:bg-red-500 transition-colors"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-4">
                <textarea 
                  placeholder="Describe una escena de celebración espectacular (ej. Fuegos artificiales sobre la Torre Eiffel con música épica)..."
                  className="bg-black/50 border border-zinc-800 rounded-lg px-4 py-3 text-xs w-full focus:outline-none focus:border-yellow-500 h-24 resize-none transition-all text-zinc-300"
                  value={input} onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  onClick={handleGenerateVideo} 
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 rounded-lg text-xs transition-all uppercase tracking-[0.2em] shadow-lg"
                >
                  <i className="fa-solid fa-clapperboard mr-2"></i> Generar Video con Veo
                </button>
                {videoResult && (
                  <div className="mt-4 animate-fadeIn">
                    <div className="text-[8px] font-bold text-zinc-500 uppercase mb-2 tracking-widest flex items-center gap-2">
                      <i className="fa-solid fa-film"></i> Resultado de Generación
                    </div>
                    <video src={videoResult} controls className="w-full rounded-lg border border-zinc-800 shadow-2xl" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>
    </div>
  );
};

export default AiFeatures;

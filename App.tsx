
import React, { useState, useEffect, useMemo } from 'react';
import { TIMEZONES } from './constants';
import CountdownCard from './components/CountdownCard';
import GlobalTicker from './components/GlobalTicker';
import MusicPlayer from './components/MusicPlayer';
import AiPersonalToast from './components/AiPersonalToast';
import ResolutionsBoard from './components/ResolutionsBoard';
import AiFeatures from './components/AiFeatures';
import Confetti from './components/Confetti';
import { TimeZoneData } from './types';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [localTz, setLocalTz] = useState<TimeZoneData | null>(null);
  const [siteName, setSiteName] = useState(() => localStorage.getItem('siteName') || 'BRYAN');
  const [isEditingName, setIsEditingName] = useState(false);
  const [triggerCelebration, setTriggerCelebration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (localTz) {
        const target = new Date(Date.UTC(2026, 0, 1, -localTz.offset, 0, 0));
        if (now >= target && !triggerCelebration) {
          setTriggerCelebration(true);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [localTz, triggerCelebration]);

  useEffect(() => {
    const tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = -(new Date().getTimezoneOffset() / 60);
    setLocalTz({
      id: 'local-tz',
      name: `MI UBICACIÓN (${tzName.split('/').pop()?.replace('_', ' ') || 'LOCAL'})`,
      offset: offset,
      isCelebrated: true
    });
  }, []);

  const handleNameSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('siteName', siteName.toUpperCase());
    setIsEditingName(false);
  };

  const displayTimezones = useMemo(() => {
    if (!localTz) return TIMEZONES;
    return [localTz, ...TIMEZONES.filter(tz => tz.id !== 'local-tz')];
  }, [localTz]);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 space-y-8 max-w-[1600px] mx-auto pb-32 bg-fireworks relative overflow-hidden">
      {triggerCelebration && <Confetti />}
      
      {/* Personalized Header for bryannuevoaño2026.com */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-zinc-800 pb-8 gap-6 relative z-10">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-4 group">
            {isEditingName ? (
              <form onSubmit={handleNameSave} className="flex items-center gap-2">
                <input 
                  autoFocus
                  className="bg-zinc-900 border-b-2 border-yellow-500 text-2xl md:text-5xl font-black uppercase outline-none px-2 text-white"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  onBlur={handleNameSave}
                />
              </form>
            ) : (
              <div className="flex items-center gap-3">
                <h1 
                  onClick={() => setIsEditingName(true)}
                  className="text-4xl md:text-6xl font-black tracking-tighter text-white italic uppercase cursor-pointer hover:text-yellow-500 transition-colors"
                >
                  {siteName} <span className="text-yellow-500">2026</span>
                  <i className="fa-solid fa-pen text-xs ml-3 opacity-0 group-hover:opacity-50 transition-opacity"></i>
                </h1>
                <div className="px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black tracking-widest uppercase shadow-lg shadow-yellow-500/20">
                  OFFICIAL SITE
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
             <p className="text-zinc-500 text-sm font-bold tracking-[0.3em] uppercase">
              bryannuevoaño2026.com
            </p>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
            <p className="text-yellow-500/50 text-[10px] font-black tracking-widest uppercase">
              Misión: Éxito Total
            </p>
          </div>
        </div>

        <MusicPlayer autoPlayTrigger={triggerCelebration} />
      </header>

      {/* Hero Countdown Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 relative z-10">
        {displayTimezones.map((tz) => (
          <CountdownCard key={tz.id} timezone={tz} currentTime={currentTime} />
        ))}
      </section>

      {/* IA Creative Suite */}
      <section className="space-y-4 relative z-10">
         <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></div>
            <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Laboratorio Creativo Gemini</h2>
         </div>
         <AiFeatures />
      </section>

      {/* Personal Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 relative z-10">
        <div className="lg:col-span-2">
          <ResolutionsBoard />
        </div>
        <div>
          <AiPersonalToast />
        </div>
      </div>

      <GlobalTicker currentTime={currentTime} />

      <footer className="text-center pt-12 border-t border-zinc-900 text-zinc-600 text-[10px] uppercase font-bold tracking-[0.5em] pb-12 relative z-10">
        <div className="mb-6 flex flex-wrap justify-center gap-8 opacity-40">
          <span>DOMAIN: bryannuevoaño2026.com</span>
          <span>SISTEMA: GEMINI-PRO-CORE</span>
          <span>ESTADO: {triggerCelebration ? 'CELEBRACIÓN ACTIVA' : 'SISTEMAS NOMINALES'}</span>
          <span>PING: 8ms</span>
        </div>
        &copy; 2025-2026 — BRYAN'S DIGITAL WORLD — TODOS LOS DERECHOS RESERVADOS
      </footer>
    </div>
  );
};

export default App;

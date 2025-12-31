
import React from 'react';
import { TimeZoneData, CountdownTime } from '../types';

interface CountdownCardProps {
  timezone: TimeZoneData;
  currentTime: Date;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ timezone, currentTime }) => {
  const isLocal = timezone.id === 'local-tz';

  const calculateTime = (): CountdownTime => {
    const target = new Date(Date.UTC(2026, 0, 1, -timezone.offset, 0, 0));
    const diff = target.getTime() - currentTime.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isFinished: false,
    };
  };

  const time = calculateTime();

  if (timezone.isCelebrated && time.isFinished) {
    return (
      <div className={`bg-zinc-900/60 p-4 rounded-xl flex flex-col items-center justify-center card-gold-border relative overflow-hidden min-h-[110px] transition-transform hover:scale-[1.02] ${isLocal ? 'ring-2 ring-yellow-500/20' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500 animate-pulse"></div>
        <p className="text-zinc-500 text-[8px] font-bold tracking-widest uppercase mb-1 text-center truncate w-full">
          {isLocal ? '✨ TU UBICACIÓN ✨' : timezone.name.split(' / ')[0]}
        </p>
        <h2 className="text-xl font-black text-yellow-500 tracking-tight gold-glow uppercase italic animate-glow-pulse">
          ¡FELIZ 2026! 🍾
        </h2>
      </div>
    );
  }

  return (
    <div className={`bg-zinc-900/40 p-4 rounded-xl transition-all border flex flex-col justify-between min-h-[110px] hover:border-zinc-700 relative group ${
      isLocal ? 'border-yellow-500/50 bg-zinc-900/60 shadow-lg shadow-yellow-500/5' : 'border-zinc-800'
    } ${timezone.isCelebrated ? 'card-gold-border' : ''}`}>
      
      {isLocal && (
        <div className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase tracking-tighter">
          Actual
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-[10px] font-bold tracking-wider uppercase leading-tight truncate w-[90%] ${isLocal ? 'text-yellow-500' : 'text-zinc-400'}`}>
          {timezone.name.split(' / ')[0]}
        </h3>
        {(timezone.isCelebrated || isLocal) && (
          <i className={`fa-solid ${isLocal ? 'fa-location-dot' : 'fa-star'} text-yellow-500 text-[8px] animate-pulse`}></i>
        )}
      </div>

      <div className="flex items-center justify-between text-yellow-500 font-bold gap-1">
        <div className="flex flex-col items-center flex-1">
          <span className="text-2xl md:text-3xl digital-font leading-none animate-shimmer">{time.days}</span>
          <span className="text-[7px] text-zinc-600 tracking-tighter uppercase font-mono group-hover:text-zinc-400 transition-colors">Días</span>
        </div>
        <span className="text-lg digital-font opacity-20 self-start">:</span>
        <div className="flex flex-col items-center flex-1">
          <span className="text-2xl md:text-3xl digital-font leading-none animate-shimmer" style={{ animationDelay: '0.5s' }}>
            {String(time.hours).padStart(2, '0')}
          </span>
          <span className="text-[7px] text-zinc-600 tracking-tighter uppercase font-mono group-hover:text-zinc-400 transition-colors">Hrs</span>
        </div>
        <span className="text-lg digital-font opacity-20 self-start">:</span>
        <div className="flex flex-col items-center flex-1">
          <span className="text-2xl md:text-3xl digital-font leading-none animate-shimmer" style={{ animationDelay: '1s' }}>
            {String(time.minutes).padStart(2, '0')}
          </span>
          <span className="text-[7px] text-zinc-600 tracking-tighter uppercase font-mono group-hover:text-zinc-400 transition-colors">Min</span>
        </div>
        <span className="text-lg digital-font opacity-20 self-start">:</span>
        <div className="flex flex-col items-center flex-1">
          <span className="text-2xl md:text-3xl digital-font leading-none animate-shimmer" style={{ animationDelay: '1.5s' }}>
            {String(time.seconds).padStart(2, '0')}
          </span>
          <span className="text-[7px] text-zinc-600 tracking-tighter uppercase font-mono group-hover:text-zinc-400 transition-colors">Seg</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownCard;

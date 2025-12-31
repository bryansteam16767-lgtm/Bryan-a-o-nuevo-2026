
import React from 'react';
import { TIMEZONES } from '../constants';

interface GlobalTickerProps {
  currentTime: Date;
}

const GlobalTicker: React.FC<GlobalTickerProps> = ({ currentTime }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-zinc-800 z-50 overflow-hidden h-12 flex items-center">
      <div className="whitespace-nowrap flex animate-[marquee_30s_linear_infinite] px-4">
        {TIMEZONES.map((tz, i) => {
          const target = new Date(Date.UTC(2026, 0, 1, -tz.offset, 0, 0));
          const diff = target.getTime() - currentTime.getTime();
          const hrsLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
          const minLeft = Math.max(0, Math.floor((diff / 1000 / 60) % 60));

          return (
            <div key={tz.id} className="inline-flex items-center px-8 border-r border-zinc-800">
              <span className="text-white text-[10px] font-bold uppercase mr-2">{tz.name.split(' / ')[0]}</span>
              <span className="text-yellow-500 text-[10px] font-mono">
                {hrsLeft}h {minLeft}m
              </span>
              {i % 3 === 0 && <span className="ml-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
            </div>
          );
        })}
        {/* Repeat for seamless loop */}
        {TIMEZONES.map((tz) => {
          const target = new Date(Date.UTC(2026, 0, 1, -tz.offset, 0, 0));
          const diff = target.getTime() - currentTime.getTime();
          const hrsLeft = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
          const minLeft = Math.max(0, Math.floor((diff / 1000 / 60) % 60));
          return (
            <div key={`${tz.id}-repeat`} className="inline-flex items-center px-8 border-r border-zinc-800">
              <span className="text-white text-[10px] font-bold uppercase mr-2">{tz.name.split(' / ')[0]}</span>
              <span className="text-yellow-500 text-[10px] font-mono">
                {hrsLeft}h {minLeft}m
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default GlobalTicker;

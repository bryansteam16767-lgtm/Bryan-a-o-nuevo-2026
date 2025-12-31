
import React, { useState, useRef, useEffect } from 'react';

const NEW_YEAR_TRACKS = [
  { name: 'Noche de Gala 2026', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { name: 'Auld Lang Syne (Remix)', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { name: 'Energía de Año Nuevo', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' }
];

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className={`flex items-center gap-4 bg-zinc-900/80 border rounded-2xl px-6 py-3 backdrop-blur-xl transition-all duration-500 ${
      isPlaying ? 'border-yellow-500/40' : 'border-zinc-800'
    }`}>
      <audio 
        ref={audioRef} 
        src={NEW_YEAR_TRACKS[currentTrackIndex].url} 
        onEnded={() => setCurrentTrackIndex((prev) => (prev + 1) % NEW_YEAR_TRACKS.length)}
      />
      
      <div className="flex flex-col items-center justify-center group cursor-pointer" onClick={togglePlay}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isPlaying ? 'bg-yellow-500 text-black animate-pulse' : 'bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700'
        }`}>
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs`}></i>
        </div>
      </div>

      <div className="flex flex-col min-w-[120px]">
        <span className="text-[8px] text-zinc-500 font-black uppercase tracking-widest mb-1">Música Ambiente</span>
        <span className={`text-[10px] font-bold truncate transition-colors ${isPlaying ? 'text-white' : 'text-zinc-600'}`}>
          {NEW_YEAR_TRACKS[currentTrackIndex].name}
        </span>
      </div>

      <div className="flex items-center gap-2 border-l border-zinc-800 pl-4 ml-2">
        <i className="fa-solid fa-volume-low text-[10px] text-zinc-600"></i>
        <input 
          type="range" min="0" max="1" step="0.01" value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-zinc-800 accent-yellow-500 cursor-pointer appearance-none rounded-full"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;


import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const p = [];
    for (let i = 0; i < 100; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        size: 5 + Math.random() * 10,
        color: ['#eab308', '#ffffff', '#71717a', '#facc15', '#fbbf24'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        rotation: Math.random() * 360,
      });
    }
    setPieces(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Confetti;

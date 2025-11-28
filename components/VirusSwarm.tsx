import React, { useEffect, useState, useRef } from 'react';

interface Popup {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bg: string;
}

export const VirusSwarm: React.FC = () => {
  const [popups, setPopups] = useState<Popup[]>([]);
  const requestRef = useRef<number>(0);

  // Initialize popups
  useEffect(() => {
    const initialPopups: Popup[] = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * (window.innerWidth - 300),
      y: Math.random() * (window.innerHeight - 200),
      vx: (Math.random() - 0.5) * 15, // Fast speed
      vy: (Math.random() - 0.5) * 15,
      bg: i % 2 === 0 ? 'bg-white' : 'bg-gray-200'
    }));
    setPopups(initialPopups);

    // Spawn more over time
    const spawner = setInterval(() => {
      setPopups(prev => {
        if (prev.length > 50) return prev; // Cap at 50 to prevent crash
        return [...prev, {
          id: Date.now(),
          x: Math.random() * (window.innerWidth - 300),
          y: Math.random() * (window.innerHeight - 200),
          vx: (Math.random() - 0.5) * 20,
          vy: (Math.random() - 0.5) * 20,
          bg: Math.random() > 0.5 ? 'bg-white' : 'bg-yellow-100'
        }];
      });
    }, 800);

    return () => clearInterval(spawner);
  }, []);

  // Animation Loop
  const animate = () => {
    setPopups(prevPopups => {
      return prevPopups.map(p => {
        let newX = p.x + p.vx;
        let newY = p.y + p.vy;
        let newVx = p.vx;
        let newVy = p.vy;

        // Bounce off walls
        if (newX <= 0 || newX >= window.innerWidth - 320) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(newX, window.innerWidth - 320));
        }
        if (newY <= 0 || newY >= window.innerHeight - 200) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(newY, window.innerHeight - 200));
        }

        return { ...p, x: newX, y: newY, vx: newVx, vy: newVy };
      });
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] overflow-hidden cursor-none">
      {/* Background flashing text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
           <h1 key={i} className="text-9xl font-black text-white animate-pulse whitespace-nowrap">
             YOU ARE AN IDIOT
           </h1>
        ))}
      </div>

      {popups.map(popup => (
        <div
          key={popup.id}
          style={{ transform: `translate(${popup.x}px, ${popup.y}px)` }}
          className={`absolute w-80 h-48 border-2 border-blue-800 shadow-[10px_10px_0_0_rgba(0,0,0,0.5)] flex flex-col ${popup.bg}`}
        >
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-500 px-2 py-1 flex justify-between items-center">
            <span className="text-white font-bold text-sm font-sans">Message from Webpage</span>
            <div className="flex gap-1">
               <button className="w-4 h-4 bg-gray-300 border border-white text-[10px] leading-3">_</button>
               <button className="w-4 h-4 bg-gray-300 border border-white text-[10px] leading-3">□</button>
               <button className="w-4 h-4 bg-red-600 border border-white text-white text-[10px] leading-3">x</button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-2">
            <div className="text-6xl animate-bounce">☺</div>
            <h2 className="text-3xl font-black font-serif text-black uppercase text-center leading-none">
              you are an idiot
            </h2>
            <div className="text-4xl animate-bounce delay-75">☺</div>
          </div>
        </div>
      ))}
    </div>
  );
};
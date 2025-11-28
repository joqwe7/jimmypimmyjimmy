import React from 'react';

interface HackedScreenProps {
  onClose: () => void;
}

export const HackedScreen: React.FC<HackedScreenProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4 font-mono text-center">
      <div className="border-4 border-red-600 p-8 bg-red-950/30 max-w-2xl w-full shadow-[0_0_50px_rgba(255,0,0,0.5)]">
        <h1 className="text-6xl font-black text-red-600 mb-8 uppercase tracking-tighter glitch-text">
          VAROITUS
        </h1>
        
        <div className="space-y-4 text-left font-terminal text-green-500 mb-8 text-lg md:text-xl">
          <p className="border-b border-red-900 pb-2">
            <span className="text-red-500 font-bold">KOHDE:</span> Jimmy Kuitunen
          </p>
          <p className="border-b border-red-900 pb-2">
            <span className="text-red-500 font-bold">IP-OSOITE:</span> 37.136.110.56
          </p>
          <div className="border-b border-red-900 pb-2 break-all">
            <span className="text-red-500 font-bold">USER-AGENT:</span><br/>
            Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36
          </div>
          <p className="text-red-500 animate-bounce mt-4 font-bold text-center">
            !! LAITE ON KOMPROMETOITU !!
          </p>
        </div>

        <button 
          onClick={onClose}
          className="bg-red-600 text-black text-2xl font-bold py-4 px-12 hover:bg-red-500 hover:scale-105 transition-all uppercase border-4 border-red-800 shadow-[0_0_20px_rgba(255,0,0,0.8)]"
        >
          SULJE
        </button>
      </div>
    </div>
  );
};
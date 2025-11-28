
import React from 'react';
import { JIMMY_IMAGE_SRC } from '../data/jimmyImage';

interface JimmyAvatarProps {
  egoPercentage: number;
  isTakingDamage: boolean;
  isHammerHit?: boolean;
}

export const JimmyAvatar: React.FC<JimmyAvatarProps> = ({ egoPercentage, isTakingDamage, isHammerHit }) => {
  // Animation classes
  const shakeClass = isHammerHit ? 'animate-harsh-shake' : (isTakingDamage ? 'animate-harsh-shake' : '');
  const glitchClass = isTakingDamage ? 'glitch-active' : '';
  
  // Visual filters based on health (damage simulation)
  // 100-80%: Normal
  // <80%: Slight sepia
  // <50%: Grayscale & High Contrast (Grim look)
  // <25%: Dark & Red tinted
  // 0%: Inverted colors (Dead/System Failure)
  let filterStyle = "";
  if (egoPercentage <= 0) filterStyle = "invert grayscale brightness-50 contrast-200";
  else if (egoPercentage < 25) filterStyle = "grayscale brightness-50 sepia hue-rotate-[-50deg] contrast-125";
  else if (egoPercentage < 50) filterStyle = "grayscale contrast-125";
  else if (egoPercentage < 80) filterStyle = "sepia-[.5]";

  return (
    <div className={`relative w-56 h-56 mx-auto transition-all duration-100`}>
      
      {/* Container / Hologram Emitter Look */}
      <div className="absolute inset-0 border-4 border-slate-700 rounded-full bg-slate-900 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden z-0">
        {/* Hologram Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent pointer-events-none z-20"></div>

        {/* THE IMAGE REPLACEMENT */}
        <img 
          src={JIMMY_IMAGE_SRC}
          alt="Jimmy"
          className={`w-full h-full object-cover rounded-full relative z-10 transition-all duration-300 ${shakeClass} ${glitchClass} ${filterStyle}`}
        />
      </div>

      {/* The Hammer Overlay */}
      {isHammerHit && (
        <div className="absolute -top-12 -right-12 text-9xl z-30 animate-hammer pointer-events-none">
          🔨
        </div>
      )}

      {/* Impact Visuals (Flash Red) */}
      {isTakingDamage && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 rounded-full overflow-hidden">
            <div className={`absolute w-full h-full bg-red-600 mix-blend-color-dodge opacity-60 animate-pulse`}></div>
            {isHammerHit && <div className="text-6xl animate-ping absolute text-yellow-500 drop-shadow-[0_0_10px_rgba(255,0,0,1)]">💥</div>}
         </div>
      )}
      
      {/* Nameplate */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-40">
        <div className={`px-4 py-1 bg-black border border-slate-500 rounded text-sm font-bold tracking-widest shadow-lg ${egoPercentage < 30 ? 'text-red-500 border-red-800' : 'text-cyan-400 border-cyan-800'}`}>
          JIMMY
        </div>
      </div>
    </div>
  );
};

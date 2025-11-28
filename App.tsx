import React, { useState, useCallback } from 'react';
import { TerminalLog } from './components/TerminalLog';
import { JimmyAvatar } from './components/JimmyAvatar';
import { HackedScreen } from './components/HackedScreen';
import { VirusSwarm } from './components/VirusSwarm';
import { AttackType, GameState, LogEntry } from './types';
import { ROAST_DATABASE, JIMMY_RETORTS, JIMMY_DEFEAT_MESSAGES } from './data/roasts';

const INITIAL_EGO = 200;

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    jimmyEgo: INITIAL_EGO,
    maxEgo: INITIAL_EGO,
    isGameOver: false,
    turnCount: 0,
    comboMultiplier: 1,
    lastAttackType: null
  });

  const [logs, setLogs] = useState<LogEntry[]>([{
    id: 'init',
    sender: 'SYSTEM',
    message: 'Yhteys muodostettu. Kohde: Jimmy. Valmiina tuhoamiseen.',
    timestamp: Date.now()
  }]);

  const [isTakingDamage, setIsTakingDamage] = useState(false);
  const [isHammerHit, setIsHammerHit] = useState(false);
  
  const [showHackedScreen, setShowHackedScreen] = useState(false);
  const [showVirusMode, setShowVirusMode] = useState(false);

  const addLog = (sender: 'PLAYER' | 'JIMMY' | 'SYSTEM', message: string, damage?: number) => {
    setLogs(prev => [...prev, {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      message,
      damage,
      timestamp: Date.now()
    }]);
  };

  const handleAttack = useCallback((type: AttackType) => {
    if (gameState.isGameOver) return;

    let multiplier = gameState.comboMultiplier;
    if (type !== AttackType.VASARA) {
      if (gameState.lastAttackType && gameState.lastAttackType !== type && gameState.lastAttackType !== AttackType.VASARA) {
        multiplier += 0.2; 
      } else if (gameState.lastAttackType === type) {
        multiplier = 1.0; 
      }
    }

    const roasts = ROAST_DATABASE[type];
    const roast = roasts[Math.floor(Math.random() * roasts.length)];

    const isCrit = Math.random() < roast.critChance;
    let damage = Math.floor(roast.baseDamage * multiplier);
    if (isCrit) damage = Math.floor(damage * 1.5);

    addLog('PLAYER', `${roast.text} ${isCrit ? '(KRIITTINEN OSUMA!)' : ''}`, damage);

    setIsTakingDamage(true);
    if (type === AttackType.VASARA) {
      setIsHammerHit(true);
    }
    
    setTimeout(() => {
      setIsTakingDamage(false);
      setIsHammerHit(false);
    }, 500);

    setGameState(prev => {
      const newEgo = Math.max(0, prev.jimmyEgo - damage);
      const isDead = newEgo <= 0;

      if (isDead) {
        setTimeout(() => {
          const defeatMsg = JIMMY_DEFEAT_MESSAGES[Math.floor(Math.random() * JIMMY_DEFEAT_MESSAGES.length)];
          addLog('SYSTEM', `KOHDE ELIMINOITU. ${defeatMsg}`);
          
          setTimeout(() => {
            setShowHackedScreen(true);
          }, 2000);
        }, 1000);
      } else {
        setTimeout(() => {
          const retort = JIMMY_RETORTS[Math.floor(Math.random() * JIMMY_RETORTS.length)];
          addLog('JIMMY', retort);
        }, 1200);
      }

      return {
        ...prev,
        jimmyEgo: newEgo,
        isGameOver: isDead,
        turnCount: prev.turnCount + 1,
        comboMultiplier: type === AttackType.VASARA ? multiplier : Math.min(3.0, multiplier),
        lastAttackType: type
      };
    });

  }, [gameState]);

  const getButtonStyles = (type: AttackType) => {
    const base = "relative overflow-hidden group py-4 px-2 rounded-md font-bold tracking-wider uppercase transition-all duration-100 transform active:translate-y-1 active:shadow-none border-b-4";
    switch (type) {
      case AttackType.ULKONAKO: 
        return `${base} bg-gradient-to-b from-orange-600 to-orange-800 border-orange-950 text-orange-100 hover:brightness-110 shadow-[0_4px_0_rgba(67,20,7,1)]`;
      case AttackType.ALYKKYYS: 
        return `${base} bg-gradient-to-b from-blue-600 to-blue-800 border-blue-950 text-blue-100 hover:brightness-110 shadow-[0_4px_0_rgba(30,58,138,1)]`;
      case AttackType.PERSOONA: 
        return `${base} bg-gradient-to-b from-purple-600 to-purple-800 border-purple-950 text-purple-100 hover:brightness-110 shadow-[0_4px_0_rgba(88,28,135,1)]`;
      case AttackType.SERVAUS: 
        return `${base} bg-gradient-to-b from-pink-600 to-pink-800 border-pink-950 text-pink-100 hover:brightness-110 shadow-[0_4px_0_rgba(131,24,67,1)]`;
      default: return base;
    }
  };

  const standardAttacks = Object.values(AttackType).filter(t => t !== AttackType.VASARA);

  if (showVirusMode) {
    return <VirusSwarm />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 crt font-sans selection:bg-green-500 selection:text-black">
      
      {showHackedScreen && (
        <HackedScreen onClose={() => {
          setShowHackedScreen(false);
          setShowVirusMode(true);
        }} />
      )}

      <div className="max-w-3xl w-full bg-black/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col relative ring-1 ring-white/10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 border-b border-slate-700 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 font-terminal tracking-widest drop-shadow-sm">
              JIMMY_DESTROYER <span className="text-xs text-slate-500 align-top">v2.0</span>
            </h1>
          </div>
          <div className="text-cyan-400 text-xs md:text-sm font-mono bg-black/50 px-3 py-1 rounded border border-cyan-900/50">
            VUORO: <span className="text-white">{gameState.turnCount}</span> | KERROIN: <span className="text-yellow-400">x{gameState.comboMultiplier.toFixed(1)}</span>
          </div>
        </div>

        {/* Game Area */}
        <div className="p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          
          {/* Jimmy's Area */}
          <div className="flex flex-col items-center space-y-6 relative">
            <JimmyAvatar 
              egoPercentage={(gameState.jimmyEgo / gameState.maxEgo) * 100} 
              isTakingDamage={isTakingDamage}
              isHammerHit={isHammerHit}
            />
            
            <div className="w-full max-w-lg relative group">
              <div className="flex justify-between text-xs uppercase font-bold text-slate-400 mb-1 px-1">
                <span>EGO INTEGRITY</span>
                <span className={`${gameState.jimmyEgo < 50 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                  {gameState.jimmyEgo} / {gameState.maxEgo}
                </span>
              </div>
              
              {/* Health Bar Container */}
              <div className="h-8 bg-black/60 rounded border border-slate-600 relative overflow-hidden shadow-inner">
                 {/* Grid lines inside bar */}
                 <div className="absolute inset-0 z-10 flex justify-between px-1">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-black/20"></div>)}
                 </div>
                <div 
                  className={`h-full transition-all duration-300 ease-out relative
                    ${gameState.jimmyEgo < 60 ? 'bg-gradient-to-r from-red-900 to-red-600' : 'bg-gradient-to-r from-green-900 to-green-500'}
                  `}
                  style={{ width: `${(gameState.jimmyEgo / gameState.maxEgo) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-slate-500 opacity-50"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-slate-500 opacity-50"></div>
            </div>
          </div>

          {/* Terminal Output */}
          <TerminalLog logs={logs} />

          {/* Controls */}
          <div className="space-y-4">
             {/* Standard Insults Grid */}
            <div className="grid grid-cols-2 gap-4">
              {!gameState.isGameOver && standardAttacks.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleAttack(type)}
                    disabled={gameState.jimmyEgo <= 0}
                    className={getButtonStyles(type)}
                  >
                    <span className="relative z-10 drop-shadow-md">{type}</span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
            </div>

            {/* The BIG Hammer Button */}
            {!gameState.isGameOver ? (
              <button
                onClick={() => handleAttack(AttackType.VASARA)}
                className="w-full group relative bg-gray-900 hover:bg-gray-800 text-red-500 border-b-4 border-red-900 active:border-b-0 active:translate-y-1 py-5 rounded-lg font-black text-2xl tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden"
              >
                {/* Hazard stripes background */}
                <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ff0000_10px,#ff0000_20px)]"></div>
                
                <div className="relative z-10 flex items-center justify-center gap-6">
                  <span className="text-4xl group-hover:rotate-12 transition-transform filter drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">🔨</span>
                  <span className="text-shadow-red">LYÖ VASARALLA</span>
                  <span className="text-4xl group-hover:-rotate-12 transition-transform filter drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">🔨</span>
                </div>
              </button>
            ) : (
              <div className="text-center p-6 bg-red-950/50 border border-red-500/50 rounded animate-pulse text-red-400 font-mono font-bold tracking-wider">
                 /// JÄRJESTELMÄVIRHE: KOHDE TUHOUTUNUT ///
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
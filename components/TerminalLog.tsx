import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface TerminalLogProps {
  logs: LogEntry[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="relative group">
      {/* Decorative top bar */}
      <div className="absolute -top-3 left-4 bg-slate-800 px-2 text-[10px] text-slate-400 font-mono tracking-widest border border-slate-600 rounded-sm z-10">
        TERMINAL_OUTPUT // LOG.SYS
      </div>

      <div className="flex-1 bg-black/90 border border-slate-700 rounded-md p-4 overflow-y-auto font-terminal text-lg h-64 shadow-[inset_0_0_20px_rgba(0,0,0,1)] scrollbar-hide relative">
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_10px_rgba(34,197,94,0.05)]"></div>

        {logs.length === 0 && (
          <div className="text-slate-600 italic text-center mt-10 animate-pulse">
            > Odottamassa syötettä...
          </div>
        )}
        
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="animate-fade-in relative pl-2 border-l-2 border-transparent hover:border-slate-700 transition-colors">
              <span className="text-slate-600 text-xs font-mono mr-2 opacity-50">
                {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
              </span>
              
              {log.sender === 'PLAYER' && (
                <span className="text-green-500 font-bold mr-2 drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]">
                  &gt;&gt; SINÄ:
                </span>
              )}
              {log.sender === 'JIMMY' && (
                <span className="text-yellow-500 font-bold mr-2 drop-shadow-[0_0_3px_rgba(234,179,8,0.5)]">
                  &gt;&gt; JIMMY:
                </span>
              )}
              {log.sender === 'SYSTEM' && (
                <span className="text-cyan-500 font-bold mr-2 drop-shadow-[0_0_3px_rgba(6,182,212,0.5)]">
                  &gt;&gt; SYSTEM:
                </span>
              )}

              <span className={`leading-tight ${
                log.sender === 'SYSTEM' ? 'text-cyan-300 italic' : 
                log.sender === 'JIMMY' ? 'text-yellow-100' :
                'text-green-100'
              }`}>
                {log.message}
              </span>
              
              {log.damage && log.damage > 0 && (
                <div className="inline-block ml-2 text-xs font-mono text-red-500 border border-red-900/50 bg-red-950/30 px-1 rounded animate-pulse">
                  -{log.damage} HP
                </div>
              )}
            </div>
          ))}
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};
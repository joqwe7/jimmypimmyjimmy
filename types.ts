export enum AttackType {
  ULKONAKO = 'ULKONÄKÖ',
  ALYKKYYS = 'ÄLYKKYYS',
  PERSOONA = 'PERSOONA',
  SERVAUS = 'SERVAUS',
  VASARA = 'VASARA'
}

export interface LogEntry {
  id: string;
  sender: 'PLAYER' | 'JIMMY' | 'SYSTEM';
  message: string;
  damage?: number;
  timestamp: number;
}

export interface GameState {
  jimmyEgo: number;
  maxEgo: number;
  isGameOver: boolean;
  turnCount: number;
  comboMultiplier: number;
  lastAttackType: AttackType | null;
}

export interface Roast {
  text: string;
  baseDamage: number;
  critChance: number;
}
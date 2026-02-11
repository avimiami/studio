
export type CarColor = 'blue' | 'yellow' | 'pink' | 'red';

export const CAR_COLORS: Record<CarColor, string> = {
  blue: '#29ABE2', // Primary Blue
  yellow: '#FFD700', // Gold
  pink: '#FF69B4', // Hot Pink
  red: '#FF0000', // Red
};

export type CarModel = 'bugatti' | 'muscle' | 'cyberpunk';

export const CAR_MODELS: Record<CarModel, string> = {
  bugatti: 'Bugatti',
  muscle: 'Muscle Car',
  cyberpunk: 'Cyberpunk',
};

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  direction: Direction;
  color: string;
  isObstacle?: boolean;
  isFinishLine?: boolean;
  isChanceGate?: boolean;
  isTunnel?: boolean; // Passable - car can drive through
  isBridge?: boolean; // Passable - car drives over
  label?: string; // For displaying text on obstacles/finish line
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  timestamp?: unknown;
}

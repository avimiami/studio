
import type { Timestamp } from 'firebase/firestore';

export type CarColor = 'blue' | 'yellow' | 'pink' | 'red';

export const CAR_COLORS: Record<CarColor, string> = {
  blue: '#29ABE2', // Primary Blue
  yellow: '#FFD700', // Gold
  pink: '#FF69B4', // Hot Pink
  red: '#FF0000', // Red
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
  label?: string; // For displaying text on obstacles/finish line
}

export interface LeaderboardEntry {
  id?: string; // Document ID from Firestore
  name: string;
  score: number;
  timestamp: Timestamp | Date; // Firestore Timestamp or Date for server-side
}

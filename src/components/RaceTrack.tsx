"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CarColor, Direction, GameObject } from '@/lib/types';
import { CAR_COLORS } from '@/lib/types';
import { BugattiCar } from '@/components/icons/BugattiCar';
import { ChevyCar } from '@/components/icons/ChevyCar';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw } from 'lucide-react';

interface RaceTrackProps {
  playerCarColorName: CarColor;
}

const TRACK_WIDTH = 800;
const TRACK_HEIGHT = 600;
const CAR_WIDTH = 40;
const CAR_HEIGHT = 70;
const MOVE_STEP = 20; // Increased step for noticeable movement
const NUM_PACE_CARS = 3;
const PACE_CAR_SPEED = 2; // Slower speed for pace cars

export function RaceTrack({ playerCarColorName }: RaceTrackProps) {
  const playerCarColor = CAR_COLORS[playerCarColorName];
  const [score, setScore] = useState(0);
  const gameTimeRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const initialPlayerCarState = {
    id: 'player',
    x: TRACK_WIDTH / 2 - CAR_WIDTH / 2,
    y: TRACK_HEIGHT - CAR_HEIGHT - 20,
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    direction: 'up' as Direction,
    color: playerCarColor,
  };
  const [playerCar, setPlayerCar] = useState<GameObject>(initialPlayerCarState);

  const createPaceCar = (id: number): GameObject => ({
    id: `pace-${id}`,
    x: Math.random() * (TRACK_WIDTH - CAR_WIDTH),
    y: Math.random() * (TRACK_HEIGHT / 2), // Start in upper half
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    direction: 'down' as Direction,
    color: '#555555', // Default Chevy color
  });

  const [paceCars, setPaceCars] = useState<GameObject[]>(() =>
    Array.from({ length: NUM_PACE_CARS }, (_, i) => createPaceCar(i))
  );
  
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setPlayerCar(initialPlayerCarState);
    setPaceCars(Array.from({ length: NUM_PACE_CARS }, (_, i) => createPaceCar(i)));
    setScore(0);
    setIsGameOver(false);
  }, [playerCarColorName]);


  const checkCollision = useCallback((car1: GameObject, car2: GameObject): boolean => {
    // Simple AABB collision detection
    // Adjust collision box to be slightly smaller than visual representation for more forgiving gameplay
    const collisionPadding = 10; // pixels
    return (
      car1.x < car2.x + car2.width - collisionPadding &&
      car1.x + car1.width - collisionPadding > car2.x &&
      car1.y < car2.y + car2.height - collisionPadding &&
      car1.y + car1.height - collisionPadding > car2.y
    );
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isGameOver) return;
    setPlayerCar((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;

      switch (event.key) {
        case 'ArrowUp':
          newY = Math.max(0, prev.y - MOVE_STEP);
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newY = Math.min(TRACK_HEIGHT - CAR_HEIGHT, prev.y + MOVE_STEP);
          newDirection = 'down';
          break;
        case 'ArrowLeft':
          newX = Math.max(0, prev.x - MOVE_STEP);
          newDirection = 'left';
          break;
        case 'ArrowRight':
          newX = Math.min(TRACK_WIDTH - CAR_WIDTH, prev.x + MOVE_STEP);
          newDirection = 'right';
          break;
        default:
          return prev;
      }
      return { ...prev, x: newX, y: newY, direction: newDirection };
    });
  }, [isGameOver]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (isGameOver) {
      if (gameTimeRef.current) clearInterval(gameTimeRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameTimeRef.current = setInterval(() => {
      setScore((s) => s + 1);
    }, 1000);
    
    // Game loop for pace car movement and collision detection
    gameLoopRef.current = setInterval(() => {
      // Pace car logic
      setPaceCars(prevPaceCars => 
        prevPaceCars.map(pc => {
          let newX = pc.x;
          let newY = pc.y;
          let newDirection = pc.direction;

          const dx = playerCar.x - pc.x;
          const dy = playerCar.y - pc.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) { newX += PACE_CAR_SPEED; newDirection = 'right'; }
            else { newX -= PACE_CAR_SPEED; newDirection = 'left'; }
          } else {
            if (dy > 0) { newY += PACE_CAR_SPEED; newDirection = 'down'; }
            else { newY -= PACE_CAR_SPEED; newDirection = 'up'; }
          }
          
          // Keep pace cars within bounds
          newX = Math.max(0, Math.min(TRACK_WIDTH - CAR_WIDTH, newX));
          newY = Math.max(0, Math.min(TRACK_HEIGHT - CAR_HEIGHT, newY));

          return { ...pc, x: newX, y: newY, direction: newDirection };
        })
      );

      // Collision detection
      for (const pc of paceCars) {
        if (checkCollision(playerCar, pc)) {
          setIsGameOver(true);
          break; 
        }
      }
    }, 50); // Game loop runs every 50ms

    return () => {
      if (gameTimeRef.current) clearInterval(gameTimeRef.current);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [playerCar, paceCars, checkCollision, isGameOver]);


  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <ScoreDisplay score={score} />
      <div 
        className="relative bg-muted border-4 border-primary rounded-lg shadow-2xl overflow-hidden"
        style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
        role="img"
        aria-label="Race Track Area"
        data-ai-hint="race track aerial"
      >
        <img src={`https://placehold.co/${TRACK_WIDTH}x${TRACK_HEIGHT}.png/CCCCCC/333333?text=Track`} alt="Race Track Background" className="absolute inset-0 w-full h-full object-cover opacity-50" />

        {/* Player Car */}
        <div
          style={{
            position: 'absolute',
            left: playerCar.x,
            top: playerCar.y,
            width: playerCar.width,
            height: playerCar.height,
            transition: 'left 0.05s linear, top 0.05s linear', // Smooth movement
          }}
        >
          <BugattiCar color={playerCar.color} direction={playerCar.direction} />
        </div>

        {/* Pace Cars */}
        {paceCars.map((pc) => (
          <div
            key={pc.id}
            style={{
              position: 'absolute',
              left: pc.x,
              top: pc.y,
              width: pc.width,
              height: pc.height,
              transition: 'left 0.05s linear, top 0.05s linear',
            }}
          >
            <ChevyCar color={pc.color} direction={pc.direction} />
          </div>
        ))}
        
        {isGameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
            <h2 className="text-5xl font-headline text-destructive mb-4">Game Over!</h2>
            <p className="text-3xl font-headline text-white mb-6">Final Score: {score}</p>
            <Button onClick={resetGame} size="lg" className="font-headline text-xl py-3 px-6">
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>
          </div>
        )}
      </div>
      
      {/* On-screen controls for touch/mouse */}
      {!isGameOver && (
        <div className="mt-8 grid grid-cols-3 gap-2 w-48">
          <div></div> {/* Placeholder for top-left */}
          <Button variant="outline" size="icon" className="p-4" onClick={() => handleKeyDown({ key: 'ArrowUp' } as KeyboardEvent)}><ArrowUp size={32} /></Button>
          <div></div> {/* Placeholder for top-right */}
          <Button variant="outline" size="icon" className="p-4" onClick={() => handleKeyDown({ key: 'ArrowLeft' } as KeyboardEvent)}><ArrowLeft size={32} /></Button>
          <Button variant="outline" size="icon" className="p-4" onClick={() => handleKeyDown({ key: 'ArrowDown' } as KeyboardEvent)}><ArrowDown size={32} /></Button>
          <Button variant="outline" size="icon" className="p-4" onClick={() => handleKeyDown({ key: 'ArrowRight' } as KeyboardEvent)}><ArrowRight size={32} /></Button>
        </div>
      )}
    </div>
  );
}


"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import type { CarColor, Direction, GameObject, LeaderboardEntry } from '@/lib/types';
import { CAR_COLORS } from '@/lib/types';
import { BugattiCar } from '@/components/icons/BugattiCar';
import { ChevyCar } from '@/components/icons/ChevyCar';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { getLeaderboardScores, addLeaderboardScore } from '@/app/actions/leaderboardActions';
import { LeaderboardDisplay } from '@/components/LeaderboardDisplay';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw, Flag, Trophy, Loader2, ListChecks } from 'lucide-react';

interface RaceTrackProps {
  playerCarColorName: CarColor;
}

const TRACK_WIDTH = 800;
const TRACK_HEIGHT = 750;
const CAR_WIDTH = 40;
const CAR_HEIGHT = 70;
const PLAYER_CAR_EFFECTIVE_HEIGHT = 70;
const MOVE_STEP = 20;
const NUM_PACE_CARS = 3;
const INITIAL_PACE_CAR_SPEED = 2;
const PACE_CAR_SPEED_INCREMENT = 0.5;
const FINISH_LINE_HEIGHT = 40;
const ROADBLOCK_WIDTH = TRACK_WIDTH * 0.4;
const ROADBLOCK_HEIGHT = 30;

type LeaderboardStatus = 'idle' | 'loading' | 'isTopScore' | 'notTopScore' | 'error' | 'submitting' | 'submitted';

export function RaceTrack({ playerCarColorName }: RaceTrackProps) {
  const playerCarColor = CAR_COLORS[playerCarColorName];
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [paceCarSpeed, setPaceCarSpeed] = useState(INITIAL_PACE_CAR_SPEED);
  const { toast } = useToast();

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const initialPlayerCarState = useMemo(() => ({
    id: 'player',
    x: TRACK_WIDTH / 2 - CAR_WIDTH / 2,
    y: TRACK_HEIGHT - PLAYER_CAR_EFFECTIVE_HEIGHT - 20,
    width: CAR_WIDTH,
    height: PLAYER_CAR_EFFECTIVE_HEIGHT,
    direction: 'up' as Direction,
    color: playerCarColor,
  }), [playerCarColor]);

  const [playerCar, setPlayerCar] = useState<GameObject>(initialPlayerCarState);

  const createPaceCar = (id: number): GameObject => ({
    id: `pace-${id}`,
    x: Math.random() * (TRACK_WIDTH - CAR_WIDTH),
    y: Math.random() * (TRACK_HEIGHT / 2) + FINISH_LINE_HEIGHT + 20,
    width: CAR_WIDTH,
    height: CAR_HEIGHT,
    direction: 'down' as Direction,
    color: '#555555',
  });

  const [paceCars, setPaceCars] = useState<GameObject[]>([]);
  const [obstacles, setObstacles] = useState<GameObject[]>([]);
  const [finishLine, setFinishLine] = useState<GameObject | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const [leaderboardStatus, setLeaderboardStatus] = useState<LeaderboardStatus>('idle');
  const [playerName, setPlayerName] = useState('');
  const [leaderboardScores, setLeaderboardScores] = useState<LeaderboardEntry[]>([]);


  const checkCollision = useCallback((car1: GameObject, car2: GameObject): boolean => {
    const collisionPadding = 5;
    return (
      car1.x < car2.x + car2.width - collisionPadding &&
      car1.x + car1.width - collisionPadding > car2.x &&
      car1.y < car2.y + car2.height - collisionPadding &&
      car1.y + car1.height - collisionPadding > car2.y
    );
  }, []);

  const resetGame = useCallback((isNewLevelStart = false) => {
    let currentLevel = level;
    let currentScore = score;

    if (isNewLevelStart) {
      currentLevel = level + 1;
      setLevel(currentLevel);
      currentScore = score + 1; // Score increases by 1 per level completed
      setScore(currentScore);
    } else { // Full reset (Play Again)
      currentLevel = 1;
      setLevel(1);
      currentScore = 0;
      setScore(0);
    }

    setPlayerCar(initialPlayerCarState);
    setPaceCars(Array.from({ length: NUM_PACE_CARS }, (_, i) => createPaceCar(i)));
    setPaceCarSpeed(INITIAL_PACE_CAR_SPEED + (currentLevel - 1) * PACE_CAR_SPEED_INCREMENT);

    setFinishLine({
      id: 'finish',
      x: 0,
      y: 0,
      width: TRACK_WIDTH,
      height: FINISH_LINE_HEIGHT,
      color: 'hsl(var(--primary))',
      isFinishLine: true,
      label: 'FINISH',
      direction: 'up',
    });

    const obstacleEffectiveWidth = TRACK_WIDTH * 0.35;
    const trackMargin = TRACK_WIDTH * 0.05;

    const leftPlacementMaxRandomRange = (TRACK_WIDTH / 2) - obstacleEffectiveWidth - (2 * trackMargin);
    const rightPlacementMaxRandomRange = (TRACK_WIDTH / 2) - obstacleEffectiveWidth - (2 * trackMargin);

    let tunnelX, bridgeX;

    if (currentLevel % 2 === 1) {
      tunnelX = trackMargin + Math.random() * Math.max(0, leftPlacementMaxRandomRange);
      bridgeX = (TRACK_WIDTH / 2) + trackMargin + Math.random() * Math.max(0, rightPlacementMaxRandomRange);
    } else {
      tunnelX = (TRACK_WIDTH / 2) + trackMargin + Math.random() * Math.max(0, rightPlacementMaxRandomRange);
      bridgeX = trackMargin + Math.random() * Math.max(0, leftPlacementMaxRandomRange);
    }
    
    tunnelX = Math.max(trackMargin, Math.min(tunnelX, TRACK_WIDTH - trackMargin - obstacleEffectiveWidth));
    bridgeX = Math.max(trackMargin, Math.min(bridgeX, TRACK_WIDTH - trackMargin - obstacleEffectiveWidth));


    const actualTunnelWidth = TRACK_WIDTH * 0.35;
    const actualBridgeWidth = TRACK_WIDTH * 0.35;
    const roadblockX = TRACK_WIDTH / 2 - ROADBLOCK_WIDTH / 2;

    setObstacles([
      { id: 'tunnel', x: tunnelX, y: TRACK_HEIGHT * 0.20, width: actualTunnelWidth, height: 60, color: 'hsl(var(--muted))', isObstacle: true, label: 'Tunnel', direction: 'up' as Direction },
      { id: 'bridge', x: bridgeX, y: TRACK_HEIGHT * 0.45, width: actualBridgeWidth, height: 50, color: 'hsl(var(--secondary))', isObstacle: true, label: 'Bridge', direction: 'up' as Direction},
      { id: 'roadblock', x: roadblockX, y: TRACK_HEIGHT * 0.70, width: ROADBLOCK_WIDTH, height: ROADBLOCK_HEIGHT, color: 'hsl(var(--destructive))', isObstacle: true, label: 'Roadblock', direction: 'up' as Direction},
      { id: 'wall-left', x: 0, y: TRACK_HEIGHT * 0.30, width: TRACK_WIDTH * 0.15, height: 40, color: 'hsl(var(--border))', isObstacle: true, label: '', direction: 'up' as Direction},
      { id: 'wall-right', x: TRACK_WIDTH * 0.85, y: TRACK_HEIGHT * 0.30, width: TRACK_WIDTH * 0.15, height: 40, color: 'hsl(var(--border))', isObstacle: true, label: '', direction: 'up' as Direction},
    ]);

    setIsGameOver(false);
    setLeaderboardStatus('idle');
    setPlayerName('');
    setLeaderboardScores([]); // Clear previous leaderboard scores
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  }, [level, score, initialPlayerCarState]);


  useEffect(() => {
    // Initialize paceCars and obstacles on mount (client-side only)
    setPaceCars(Array.from({ length: NUM_PACE_CARS }, (_, i) => createPaceCar(i)));
    
    // Call resetGame to set up initial obstacles and finish line
    // This will use Math.random, so it's important it runs client-side after initial hydration
    resetGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlayerCarState]); // Only on initial mount based on car color

  const handlePlayerMove = useCallback((key: string) => {
    if (isGameOver) return;
    setPlayerCar((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;

      switch (key) {
        case 'ArrowUp':
          newY = Math.max(0, prev.y - MOVE_STEP);
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newY = Math.min(TRACK_HEIGHT - PLAYER_CAR_EFFECTIVE_HEIGHT, prev.y + MOVE_STEP);
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

      const proposedCar = { ...prev, x: newX, y: newY, direction: newDirection };

      for (const obs of obstacles) {
        if (checkCollision(proposedCar, obs)) {
          return prev;
        }
      }
      return proposedCar;
    });
  }, [isGameOver, obstacles, checkCollision]);


  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => handlePlayerMove(event.key);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handlePlayerMove]);


  // Game Loop Effect
  useEffect(() => {
    if (isGameOver || !paceCars.length || !obstacles.length || !finishLine) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      setPaceCars(prevPaceCars =>
        prevPaceCars.map(pc => {
          let newX = pc.x;
          let newY = pc.y;
          let newDirection = pc.direction;

          const dx = playerCar.x - pc.x;
          const dy = playerCar.y - pc.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) { newX += paceCarSpeed; newDirection = 'right'; }
            else { newX -= paceCarSpeed; newDirection = 'left'; }
          } else {
            if (dy > 0) { newY += paceCarSpeed; newDirection = 'down'; }
            else { newY -= paceCarSpeed; newDirection = 'up'; }
          }

          newX = Math.max(0, Math.min(TRACK_WIDTH - CAR_WIDTH, newX));
          newY = Math.max(FINISH_LINE_HEIGHT, Math.min(TRACK_HEIGHT - CAR_HEIGHT, newY));

          const proposedPaceCar = { ...pc, x: newX, y: newY, direction: newDirection };

          for (const obs of obstacles) {
            if (checkCollision(proposedPaceCar, obs)) {
              if (Math.random() < 0.5) {
                 proposedPaceCar.x = pc.x;
              } else {
                 proposedPaceCar.y = pc.y;
              }
              if (Math.random() < 0.2) proposedPaceCar.x += (Math.random() < 0.5 ? -MOVE_STEP/2 : MOVE_STEP/2);
              break;
            }
          }
          return proposedPaceCar;
        })
      );

      for (const pc of paceCars) {
        if (checkCollision(playerCar, pc)) {
          setIsGameOver(true);
          break;
        }
      }

      if (finishLine && checkCollision(playerCar, finishLine)) {
        resetGame(true); // true indicates it's a new level start
      }

    }, 50);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerCar, paceCars, obstacles, finishLine, checkCollision, isGameOver, paceCarSpeed, resetGame]);


  // Leaderboard Check Effect
  useEffect(() => {
    if (isGameOver && score > 0 && leaderboardStatus === 'idle') {
      setLeaderboardStatus('loading');
      getLeaderboardScores()
        .then((topScores) => {
          setLeaderboardScores(topScores); // Store for potential display
          if (topScores.length < 10 || score > (topScores[topScores.length - 1]?.score || 0)) {
            setLeaderboardStatus('isTopScore');
          } else {
            setLeaderboardStatus('notTopScore');
          }
        })
        .catch((err) => {
          console.error("Failed to check leaderboard", err);
          toast({
            title: "Leaderboard Error",
            description: "Could not connect to the leaderboard.",
            variant: "destructive",
          });
          setLeaderboardStatus('error');
        });
    }
  }, [isGameOver, score, toast, leaderboardStatus]);

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      toast({ title: "Name Required", description: "Please enter your name for the leaderboard.", variant: "destructive" });
      return;
    }
    setLeaderboardStatus('submitting');
    try {
      const result = await addLeaderboardScore({ name: playerName, score });
      if (result.success) {
        toast({ title: "Score Saved!", description: "You're on the leaderboard!", className: "bg-green-500 text-white" });
        // Re-fetch leaderboard to show the new score
        setLeaderboardStatus('loading'); // Show loading while re-fetching
        getLeaderboardScores()
          .then(updatedScores => {
            setLeaderboardScores(updatedScores);
            setLeaderboardStatus('submitted');
          })
          .catch(() => {
            // If re-fetch fails, still mark as submitted, but leaderboard might be stale
            setLeaderboardStatus('submitted'); 
            toast({ title: "Leaderboard Update", description: "Could not refresh leaderboard, but your score is saved.", variant: "default"});
          });
      } else {
        toast({ title: "Submission Failed", description: result.error || "Could not save your score.", variant: "destructive" });
        setLeaderboardStatus('isTopScore'); // Allow retry
      }
    } catch (err) {
      console.error("Error submitting score to server action:", err);
      toast({ title: "Submission Error", description: "An unexpected error occurred.", variant: "destructive" });
      setLeaderboardStatus('isTopScore'); // Allow retry
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <ScoreDisplay score={score} level={level} />
      <div
        className="relative bg-muted/70 border-4 border-primary rounded-lg shadow-2xl overflow-hidden"
        style={{ width: TRACK_WIDTH, height: TRACK_HEIGHT }}
        role="img"
        aria-label="Race Track Area"
        data-ai-hint="race track obstacles"
      >
        <img src={`https://placehold.co/${TRACK_WIDTH}x${TRACK_HEIGHT}.png/EEEEEE/333333?text=Track`} alt="Race Track Background" className="absolute inset-0 w-full h-full object-cover opacity-30" />

        {finishLine && (
          <div
            style={{
              position: 'absolute',
              left: finishLine.x,
              top: finishLine.y,
              width: finishLine.width,
              height: finishLine.height,
              backgroundColor: finishLine.color,
              borderBottom: '2px dashed hsl(var(--foreground))',
            }}
            className="flex items-center justify-center"
          >
            <Flag className="h-6 w-6 text-accent-foreground mr-2" />
            <span className="font-headline text-xl text-accent-foreground">{finishLine.label}</span>
          </div>
        )}

        {obstacles.map((obs) => (
          <div
            key={obs.id}
            style={{
              position: 'absolute',
              left: obs.x,
              top: obs.y,
              width: obs.width,
              height: obs.height,
              backgroundColor: obs.color,
              border: '2px solid hsl(var(--border))',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
            }}
             className="flex items-center justify-center rounded"
          >
            <span className="font-body text-sm text-foreground/80">{obs.label}</span>
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            left: playerCar.x,
            top: playerCar.y,
            width: playerCar.width,
            height: playerCar.height,
            transition: 'left 0.05s linear, top 0.05s linear',
          }}
        >
          <BugattiCar color={playerCar.color} direction={playerCar.direction} className="w-full h-full" />
        </div>

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
            <ChevyCar color={pc.color} direction={pc.direction} className="w-full h-full" />
          </div>
        ))}

        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 p-4 space-y-4 overflow-y-auto">
            <h2 className="text-5xl font-headline text-destructive">Game Over!</h2>
            <p className="text-3xl font-headline text-white">Final Score: {score}</p>
            <p className="text-2xl font-headline text-white">Reached Level: {level}</p>

            {(leaderboardStatus === 'loading') && (
              <div className="flex items-center text-white text-lg">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Checking leaderboard...
              </div>
            )}

            {leaderboardStatus === 'isTopScore' && (
              <form onSubmit={handleNameSubmit} className="flex flex-col items-center space-y-3 w-full max-w-xs">
                <p className="text-xl text-yellow-400 font-semibold flex items-center"><Trophy className="mr-2 h-6 w-6 text-yellow-400" /> You made the Top 10!</p>
                <Input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Enter your name"
                  className="text-center"
                  maxLength={20}
                />
                <Button type="submit" size="lg" className="font-headline text-lg bg-green-500 hover:bg-green-600">
                  Save Score
                </Button>
              </form>
            )}
            
            {(leaderboardStatus === 'submitting') && (
              <div className="flex items-center text-white text-lg">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting score...
              </div>
            )}
            
            {/* Leaderboard Display Section */}
            {(leaderboardStatus === 'notTopScore' || leaderboardStatus === 'submitted' || (leaderboardStatus === 'error' && leaderboardScores.length > 0)) && (
                leaderboardScores.length > 0 ? (
                    <LeaderboardDisplay entries={leaderboardScores} />
                ) : (
                   leaderboardStatus !== 'error' && <p className="text-lg text-white">Leaderboard is currently empty. Be the first!</p>
                )
            )}
            {leaderboardStatus === 'error' && leaderboardScores.length === 0 && (
                 <p className="text-lg text-red-400 my-2">Could not load leaderboard data.</p>
            )}
             {leaderboardStatus === 'submitted' && playerName && (
               <p className="text-xl text-green-400 font-semibold">Score saved, {playerName}!</p>
            )}


            <Button onClick={() => resetGame(false)} size="lg" className="font-headline text-xl py-3 px-6 !mt-6"> {/* Added !mt-6 for spacing */}
              <RotateCcw className="mr-2 h-5 w-5" />
              Play Again
            </Button>
          </div>
        )}
      </div>

      {!isGameOver && (
        <div className="mt-8 grid grid-cols-3 gap-2 w-48">
          <div></div>
          <Button variant="outline" size="icon" className="p-4 active:bg-accent" onClick={() => handlePlayerMove('ArrowUp')}><ArrowUp size={32} /></Button>
          <div></div>
          <Button variant="outline" size="icon" className="p-4 active:bg-accent" onClick={() => handlePlayerMove('ArrowLeft')}><ArrowLeft size={32} /></Button>
          <Button variant="outline" size="icon" className="p-4 active:bg-accent" onClick={() => handlePlayerMove('ArrowDown')}><ArrowDown size={32} /></Button>
          <Button variant="outline" size="icon" className="p-4 active:bg-accent" onClick={() => handlePlayerMove('ArrowRight')}><ArrowRight size={32} /></Button>
        </div>
      )}
    </div>
  );
}


interface ScoreDisplayProps {
  score: number;
  level: number;
}

export function ScoreDisplay({ score, level }: ScoreDisplayProps) {
  return (
    <div className="p-4 bg-background/90 rounded-lg shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-4 items-center border border-primary/50">
      <h2 className="text-2xl font-headline text-primary">Score: {score}</h2>
      <div className="border-l border-primary/50 h-6"></div>
      <h2 className="text-2xl font-headline text-accent">Level: {level}</h2>
    </div>
  );
}

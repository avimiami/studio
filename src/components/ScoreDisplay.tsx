interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="p-4 bg-background/80 rounded-lg shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <h2 className="text-2xl font-headline text-primary">Score: {score}</h2>
    </div>
  );
}

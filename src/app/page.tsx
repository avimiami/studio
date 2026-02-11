"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CarSelector } from '@/components/CarSelector';
import { LeaderboardDisplay } from '@/components/LeaderboardDisplay';
import { Button } from '@/components/ui/button';
import type { CarColor, CarModel, LeaderboardEntry } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { getLeaderboardScores } from '@/app/actions/leaderboardActions';

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState<CarColor>('blue');
  const [selectedModel, setSelectedModel] = useState<CarModel>('bugatti');
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const scores = await getLeaderboardScores();
        setLeaderboardEntries(scores);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const handleStartRace = () => {
    router.push(`/race?color=${selectedColor}&model=${selectedModel}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-background to-secondary">
      <header className="mb-10 text-center">
        <h1 className="text-6xl font-headline text-primary drop-shadow-lg">Ariel's Car Chaser Game</h1>
        <p className="mt-2 text-xl text-foreground/80 font-body">Select your car and hit the track!</p>
      </header>
      
      <CarSelector 
        selectedColor={selectedColor} 
        selectedModel={selectedModel}
        onColorSelect={setSelectedColor} 
        onModelSelect={setSelectedModel}
      />

      <Button
        onClick={handleStartRace}
        className="mt-10 py-8 px-12 text-2xl font-headline rounded-lg shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-transform transform hover:scale-105"
        size="lg"
      >
        Start Race
        <ArrowRight className="ml-3 h-7 w-7" />
      </Button>

      {!isLoadingLeaderboard && (
        <LeaderboardDisplay entries={leaderboardEntries} />
      )}
    </main>
  );
}

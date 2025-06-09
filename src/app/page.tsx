"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CarSelector } from '@/components/CarSelector';
import { Button } from '@/components/ui/button';
import type { CarColor } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const [selectedColor, setSelectedColor] = useState<CarColor>('blue');
  const router = useRouter();

  const handleStartRace = () => {
    router.push(`/race?color=${selectedColor}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-background to-secondary">
      <header className="mb-10 text-center">
        <h1 className="text-6xl font-headline text-primary drop-shadow-lg">Velocity Chaser</h1>
        <p className="mt-2 text-xl text-foreground/80 font-body">Select your car and hit the track!</p>
      </header>
      
      <CarSelector selectedColor={selectedColor} onColorSelect={setSelectedColor} />

      <Button
        onClick={handleStartRace}
        className="mt-10 py-8 px-12 text-2xl font-headline rounded-lg shadow-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-transform transform hover:scale-105"
        size="lg"
      >
        Start Race
        <ArrowRight className="ml-3 h-7 w-7" />
      </Button>
    </main>
  );
}

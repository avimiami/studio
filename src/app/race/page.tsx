"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { RaceTrack } from '@/components/RaceTrack';
import type { CarColor, CarModel } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

function RacePageContent() {
  const searchParams = useSearchParams();
  const colorParam = searchParams.get('color') as CarColor | null;
  const modelParam = searchParams.get('model') as CarModel | null;
  
  // Default to blue if no color is specified or if it's an invalid color
  const selectedColor: CarColor = colorParam && ['blue', 'yellow', 'pink', 'red'].includes(colorParam) ? colorParam : 'blue';
  
  // Default to bugatti if no model is specified or if it's an invalid model
  const selectedModel: CarModel = modelParam && ['bugatti', 'muscle', 'cyberpunk'].includes(modelParam) ? modelParam : 'bugatti';

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-background to-secondary p-4 overflow-hidden">
      <RaceTrack playerCarColorName={selectedColor} playerCarModel={selectedModel} />
       <Button asChild variant="outline" className="fixed bottom-4 right-4 shadow-lg">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Selection
        </Link>
      </Button>
    </main>
  );
}

export default function RacePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Race...</div>}>
      <RacePageContent />
    </Suspense>
  );
}

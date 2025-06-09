"use client";

import type { CarColor} from '@/lib/types';
import { CAR_COLORS } from '@/lib/types';
import { BugattiCar } from '@/components/icons/BugattiCar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CarSelectorProps {
  selectedColor: CarColor;
  onColorSelect: (color: CarColor) => void;
}

export function CarSelector({ selectedColor, onColorSelect }: CarSelectorProps) {
  const colors = Object.keys(CAR_COLORS) as CarColor[];

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center text-primary">Choose Your Racer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="p-4 rounded-lg bg-secondary/50">
           <BugattiCar color={CAR_COLORS[selectedColor]} className="w-24 h-auto" />
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
          {colors.map((color) => (
            <Button
              key={color}
              onClick={() => onColorSelect(color)}
              variant={selectedColor === color ? 'default' : 'outline'}
              className={cn(
                "py-6 text-lg capitalize transition-all duration-200 ease-in-out transform hover:scale-105",
                selectedColor === color && "ring-4 ring-offset-2 ring-primary"
              )}
              style={{ 
                backgroundColor: selectedColor === color ? CAR_COLORS[color] : undefined,
                borderColor: CAR_COLORS[color],
                color: selectedColor === color ? 'hsl(var(--primary-foreground))' : CAR_COLORS[color]
              }}
            >
              {color}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

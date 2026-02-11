"use client";

import type { CarColor, CarModel } from '@/lib/types';
import { CAR_COLORS, CAR_MODELS } from '@/lib/types';
import { BugattiCar } from '@/components/icons/BugattiCar';
import { MuscleCar } from '@/components/icons/MuscleCar';
import { CyberpunkCar } from '@/components/icons/CyberpunkCar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CarSelectorProps {
  selectedColor: CarColor;
  selectedModel: CarModel;
  onColorSelect: (color: CarColor) => void;
  onModelSelect: (model: CarModel) => void;
}

export function CarSelector({ selectedColor, selectedModel, onColorSelect, onModelSelect }: CarSelectorProps) {
  const colors = Object.keys(CAR_COLORS) as CarColor[];
  const models = Object.keys(CAR_MODELS) as CarModel[];

  const renderCarPreview = () => {
    const carColor = CAR_COLORS[selectedColor];
    switch (selectedModel) {
      case 'bugatti':
        return <BugattiCar color={carColor} className="w-24 h-auto" />;
      case 'muscle':
        return <MuscleCar color={carColor} stripeColor="#ffffff" className="w-24 h-auto" />;
      case 'cyberpunk':
        return <CyberpunkCar color={carColor} glowColor="#00ffff" className="w-24 h-auto" />;
      default:
        return <BugattiCar color={carColor} className="w-24 h-auto" />;
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center text-primary">Choose Your Racer</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {/* Car Preview */}
        <div className="p-4 rounded-lg bg-secondary/50 min-h-[140px] flex items-center justify-center">
          {renderCarPreview()}
        </div>

        {/* Model Selection */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3 text-center text-foreground/80">Select Model</h3>
          <div className="grid grid-cols-3 gap-3 w-full">
            {models.map((model) => (
              <Button
                key={model}
                onClick={() => onModelSelect(model)}
                variant={selectedModel === model ? 'default' : 'outline'}
                className={cn(
                  "py-4 text-sm capitalize transition-all duration-200 ease-in-out transform hover:scale-105",
                  selectedModel === model && "ring-2 ring-offset-2 ring-primary bg-primary"
                )}
              >
                {CAR_MODELS[model]}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-3 text-center text-foreground/80">Select Color</h3>
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
        </div>
      </CardContent>
    </Card>
  );
}

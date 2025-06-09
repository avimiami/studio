
import type { SVGProps } from 'react';

interface CarProps extends SVGProps<SVGSVGElement> {
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function BugattiCar({ color = 'blue', direction = 'up', ...props }: CarProps) {
  const rotation = {
    up: 0,
    down: 180,
    left: -90,
    right: 90,
  }[direction];

  return (
    <svg
      width="40"
      height="70"
      viewBox="0 0 50 90" // Adjusted viewBox for a slightly different aspect ratio
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      {...props}
    >
      {/* Main Body - more streamlined */}
      <path d="M10 85 C5 80, 5 20, 10 10 H40 C45 20, 45 80, 40 85 Z" fill={color} stroke="black" strokeWidth="2" />

      {/* Cabin/Roof - more aggressive slope */}
      <path d="M15 45 C15 35, 20 25, 25 25 H25 C30 25, 35 35, 35 45 L38 55 H12 L15 45 Z" fill="#AAAAFF" stroke="black" strokeWidth="2" />
      
      {/* Windshield */}
      <path d="M18 27 H32 L30 40 H20 L18 27 Z" fill="lightblue" stroke="black" strokeWidth="1.5" />

      {/* C-line signature (simplified) */}
      <path d="M38 70 Q42 50, 38 30" stroke="black" strokeWidth="2.5" fill="none" />
      <path d="M12 70 Q8 50, 12 30" stroke="black" strokeWidth="2.5" fill="none" />
      
      {/* Headlights (quad LED style) */}
      <rect x="12" y="12" width="4" height="6" rx="1" fill="yellow" stroke="black" strokeWidth="1"/>
      <rect x="17" y="12" width="4" height="6" rx="1" fill="yellow" stroke="black" strokeWidth="1"/>
      <rect x="29" y="12" width="4" height="6" rx="1" fill="yellow" stroke="black" strokeWidth="1"/>
      <rect x="34" y="12" width="4" height="6" rx="1" fill="yellow" stroke="black" strokeWidth="1"/>

      {/* Hint of front grille (horseshoe) */}
      <path d="M22 10 C20 12, 20 18, 22 20 H28 C30 18, 30 12, 28 10 Z" fill="#555555" stroke="black" strokeWidth="1" />
      
      {/* Rear spoiler indication */}
      <rect x="12" y="82" width="26" height="4" rx="1" fill={color} stroke="black" strokeWidth="1.5" />

      {/* Wheels (implied, covered by body from top-down) - kept simple */}
      <ellipse cx="10" cy="75" rx="4" ry="7" fill="#333333" />
      <ellipse cx="40" cy="75" rx="4" ry="7" fill="#333333" />
      <ellipse cx="10" cy="25" rx="4" ry="7" fill="#333333" />
      <ellipse cx="40" cy="25" rx="4" ry="7" fill="#333333" />
    </svg>
  );
}

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
      viewBox="0 0 40 70" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      {...props}
    >
      <path d="M10 65C10 67.7614 12.2386 70 15 70C17.7614 70 20 67.7614 20 65C20 62.2386 17.7614 60 15 60C12.2386 60 10 62.2386 10 65Z" fill="black"/>
      <path d="M20 65C20 67.7614 22.2386 70 25 70C27.7614 70 30 67.7614 30 65C30 62.2386 27.7614 60 25 60C22.2386 60 20 62.2386 20 65Z" fill="black"/>
      <path d="M5 20C5 14.4772 9.47715 10 15 10H25C30.5228 10 35 14.4772 35 20V50H5V20Z" fill={color} stroke="black" strokeWidth="2"/>
      <rect x="10" y="0" width="20" height="15" rx="5" fill={color} stroke="black" strokeWidth="2"/>
      <path d="M5 50H35L30 60H10L5 50Z" fill={color} stroke="black" strokeWidth="2"/>
      {/* Headlights */}
      <rect x="7" y="12" width="5" height="8" rx="2" fill="yellow" stroke="black" strokeWidth="1"/>
      <rect x="28" y="12" width="5" height="8" rx="2" fill="yellow" stroke="black" strokeWidth="1"/>
       {/* Windshield */}
      <path d="M10 2C10 0.895431 10.8954 0 12 0H28C29.1046 0 30 0.895431 30 2V10H10V2Z" fill="lightblue" stroke="black" strokeWidth="1.5"/>
    </svg>
  );
}

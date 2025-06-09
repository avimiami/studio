import type { SVGProps } from 'react';

interface CarProps extends SVGProps<SVGSVGElement> {
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ChevyCar({ color = '#555555', direction = 'up', ...props }: CarProps) {
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
      {/* Wheels */}
      <rect x="3" y="10" width="8" height="10" rx="2" fill="black"/>
      <rect x="29" y="10" width="8" height="10" rx="2" fill="black"/>
      <rect x="3" y="45" width="8" height="10" rx="2" fill="black"/>
      <rect x="29" y="45" width="8" height="10" rx="2" fill="black"/>

      {/* Main Body */}
      <rect x="5" y="5" width="30" height="60" rx="5" fill={color} stroke="black" strokeWidth="2"/>
      
      {/* Cabin */}
      <rect x="10" y="15" width="20" height="25" rx="3" fill="#777777" stroke="black" strokeWidth="2"/>
      
      {/* Windshield */}
      <path d="M12 17H28V25H12V17Z" fill="lightblue" stroke="black" strokeWidth="1"/>
      
      {/* Headlights */}
      <circle cx="12" cy="8" r="3" fill="yellow" stroke="black" strokeWidth="1"/>
      <circle cx="28" cy="8" r="3" fill="yellow" stroke="black" strokeWidth="1"/>

      {/* Grill */}
      <rect x="15" y="5" width="10" height="5" fill="#333333" stroke="black" strokeWidth="1"/>
    </svg>
  );
}

import type { SVGProps } from 'react';

interface CarProps extends SVGProps<SVGSVGElement> {
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  stripeColor?: string;
}

export function MuscleCar({ color = '#cc0000', direction = 'up', stripeColor = '#ffffff', ...props }: CarProps) {
  const rotation = {
    up: 0,
    down: 180,
    left: -90,
    right: 90,
  }[direction];

  return (
    <svg
      width="46"
      height="78"
      viewBox="0 0 46 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      {...props}
    >
      <defs>
        <linearGradient id="musclePaint" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="20%" stopColor="#ff3333" />
          <stop offset="50%" stopColor={color} />
          <stop offset="80%" stopColor="#ff3333" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <linearGradient id="chromeShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#eeeeee" />
          <stop offset="50%" stopColor="#999999" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
        <linearGradient id="glassReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334455" />
          <stop offset="50%" stopColor="#556677" />
          <stop offset="100%" stopColor="#223344" />
        </linearGradient>
      </defs>

      {/* Wide Rear Wheels with Tires */}
      <ellipse cx="7" cy="62" rx="7" ry="9" fill="#1a1a1a" />
      <ellipse cx="39" cy="62" rx="7" ry="9" fill="#1a1a1a" />
      
      {/* Tire Tread Detail */}
      <ellipse cx="7" cy="62" rx="5" ry="7" fill="#0d0d0d" />
      <ellipse cx="39" cy="62" rx="5" ry="7" fill="#0d0d0d" />

      {/* Front Wheels */}
      <ellipse cx="8" cy="14" rx="5" ry="7" fill="#1a1a1a" />
      <ellipse cx="38" cy="14" rx="5" ry="7" fill="#1a1a1a" />
      
      {/* Rim Details */}
      <circle cx="7" cy="62" r="3" fill="#555555" />
      <circle cx="39" cy="62" r="3" fill="#555555" />
      <circle cx="8" cy="14" r="2.5" fill="#555555" />
      <circle cx="38" cy="14" r="2.5" fill="#555555" />

      {/* Main Body - Realistic Muscle Car */}
      <path 
        d="M9 72
           C7 72, 6 69, 6 65
           L7 58
           C7 55, 7 52, 8 48
           L9 40
           C9 35, 10 30, 11 25
           L12 18
           C13 12, 15 8, 17 6
           L20 4
           C22 3, 24 3, 26 4
           L29 6
           C31 8, 33 12, 34 18
           L35 25
           C36 30, 37 35, 37 40
           L38 48
           C39 52, 39 55, 39 58
           L40 65
           C40 69, 39 72, 37 72
           Z" 
        fill="url(#musclePaint)" 
        stroke="#000000"
        strokeWidth="1.5"
      />

      {/* Hood Scoop */}
      <path 
        d="M18 6
           C18 4, 19 3, 20 3
           L26 3
           C27 3, 28 4, 28 6
           L27 10
           C27 11, 26 12, 23 12
           C20 12, 19 11, 19 10
           Z" 
        fill="#990000"
        stroke="#000000"
        strokeWidth="0.8"
      />
      <ellipse cx="23" cy="5" rx="2" ry="1" fill="#660000" />

      {/* Racing Stripes - Center */}
      <path 
        d="M21 4 L23 4 L24 72 L22 72 Z" 
        fill={stripeColor}
        opacity="0.95"
      />
      <path 
        d="M21 4 L22 4 L23 72 L22 72 Z" 
        fill="#cccccc"
        opacity="0.5"
      />

      {/* Stripe Edges */}
      <path d="M20 4 L21 72" stroke="#000000" strokeWidth="0.3" opacity="0.5" />
      <path d="M24 4 L25 72" stroke="#000000" strokeWidth="0.3" opacity="0.5" />

      {/* Windshield with T-Top */}
      <path 
        d="M13 22
           C13 18, 16 16, 20 16
           L22 16
           L24 16
           C28 16, 31 18, 31 22
           L32 35
           C32 38, 30 40, 27 40
           L23 40
           L22 40
           L19 40
           C16 40, 14 38, 14 35
           Z" 
        fill="url(#glassReflect)"
        stroke="#000000"
        strokeWidth="1"
      />
      
      {/* T-Top Bar */}
      <rect x="21.5" y="16" width="1" height="24" fill="#111111" />
      
      {/* Window Frames */}
      <path d="M14 22 L18 22" stroke="#000000" strokeWidth="1" />
      <path d="M30 22 L26 22" stroke="#000000" strokeWidth="1" />

      {/* Side Windows */}
      <path d="M15 25 L17 35" stroke="#334455" strokeWidth="0.8" opacity="0.7" />
      <path d="M29 25 L27 35" stroke="#334455" strokeWidth="0.8" opacity="0.7" />

      {/* Door Lines */}
      <path d="M12 35 L19 35" stroke="#000000" strokeWidth="0.5" opacity="0.6" />
      <path d="M33 35 L26 35" stroke="#000000" strokeWidth="0.5" opacity="0.6" />
      
      {/* Door Handles */}
      <rect x="13" y="33" width="3" height="1" rx="0.3" fill="url(#chromeShine)" />
      <rect x="30" y="33" width="3" height="1" rx="0.3" fill="url(#chromeShine)" />

      {/* Chrome Front Bumper */}
      <path 
        d="M12 4
           C12 3, 13 2, 15 2
           L31 2
           C33 2, 34 3, 34 4
           L33 6
           C33 7, 32 8, 23 8
           C14 8, 13 7, 13 6
           Z" 
        fill="url(#chromeShine)"
        stroke="#000000"
        strokeWidth="0.8"
      />

      {/* Quad Headlights */}
      <circle cx="16" cy="4" r="2" fill="#ffffcc" stroke="#000000" strokeWidth="0.5" />
      <circle cx="20" cy="4" r="2" fill="#ffffcc" stroke="#000000" strokeWidth="0.5" />
      <circle cx="26" cy="4" r="2" fill="#ffffcc" stroke="#000000" strokeWidth="0.5" />
      <circle cx="30" cy="4" r="2" fill="#ffffcc" stroke="#000000" strokeWidth="0.5" />

      {/* Headlight Bezels */}
      <circle cx="16" cy="4" r="2.5" fill="none" stroke="#333333" strokeWidth="0.5" />
      <circle cx="30" cy="4" r="2.5" fill="none" stroke="#333333" strokeWidth="0.5" />

      {/* Front Grille */}
      <rect x="19" y="6" width="8" height="2" fill="#333333" />

      {/* Side Exhausts */}
      <rect x="1" y="55" width="4" height="10" rx="1" fill="url(#chromeShine)" stroke="#000000" strokeWidth="0.5" />
      <rect x="41" y="55" width="4" height="10" rx="1" fill="url(#chromeShine)" stroke="#000000" strokeWidth="0.5" />
      
      {/* Exhaust Tips */}
      <ellipse cx="1.5" cy="60" rx="1" ry="3" fill="#333333" />
      <ellipse cx="44.5" cy="60" rx="1" ry="3" fill="#333333" />

      {/* High Mount Rear Spoiler */}
      <path 
        d="M8 70
           L6 75
           C6 76, 8 77, 12 77
           L23 77
           L24 77
           L34 77
           C38 77, 40 76, 40 75
           L38 70
           Z" 
        fill="#111111"
        stroke="#000000"
        strokeWidth="1"
      />
      
      {/* Spoiler Supports */}
      <rect x="16" y="70" width="2" height="5" fill="#111111" />
      <rect x="28" y="70" width="2" height="5" fill="#111111" />

      {/* Rear Bumper */}
      <path 
        d="M10 72
           C10 74, 12 75, 23 75
           C34 75, 36 74, 36 72
           L36 70
           L10 70
           Z" 
        fill="url(#chromeShine)"
        stroke="#000000"
        strokeWidth="0.8"
      />

      {/* Taillights */}
      <rect x="12" y="71" width="4" height="2" rx="0.5" fill="#cc0000" stroke="#000000" strokeWidth="0.3" />
      <rect x="30" y="71" width="4" height="2" rx="0.5" fill="#cc0000" stroke="#000000" strokeWidth="0.3" />

      {/* Side Mirrors */}
      <ellipse cx="11" cy="26" rx="2" ry="1.5" fill="#cc0000" stroke="#000000" strokeWidth="0.5" />
      <ellipse cx="35" cy="26" rx="2" ry="1.5" fill="#cc0000" stroke="#000000" strokeWidth="0.5" />

      {/* Chrome Side Trim */}
      <path d="M8 38 L11 38" stroke="url(#chromeShine)" strokeWidth="2" />
      <path d="M35 38 L38 38" stroke="url(#chromeShine)" strokeWidth="2" />

      {/* Body Reflection/Highlight */}
      <path d="M15 10 L18 60" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
      <path d="M31 10 L28 60" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

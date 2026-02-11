import type { SVGProps } from 'react';

interface CarProps extends SVGProps<SVGSVGElement> {
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  glowColor?: string;
}

export function CyberpunkCar({ color = '#0a0a0a', direction = 'up', glowColor = '#00ffff', ...props }: CarProps) {
  const rotation = {
    up: 0,
    down: 180,
    left: -90,
    right: 90,
  }[direction];

  return (
    <svg
      width="44"
      height="76"
      viewBox="0 0 44 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}
      {...props}
    >
      <defs>
        <linearGradient id="cyberPaint" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="25%" stopColor="#333333" />
          <stop offset="50%" stopColor="#2a2a2a" />
          <stop offset="75%" stopColor="#333333" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
        <linearGradient id="neonGlowStrong" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={glowColor} stopOpacity="1" />
          <stop offset="50%" stopColor={glowColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="windowReflect" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#001133" />
          <stop offset="50%" stopColor="#003366" />
          <stop offset="100%" stopColor="#000011" />
        </linearGradient>
        <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Hover Shadow */}
      <ellipse cx="22" cy="70" rx="18" ry="4" fill="#000000" opacity="0.3" filter="blur(3px)" />
      
      {/* Neon Underglow */}
      <ellipse cx="22" cy="72" rx="17" ry="3" fill={glowColor} opacity="0.5" filter="url(#glowBlur)" />
      <ellipse cx="22" cy="72" rx="14" ry="2" fill={glowColor} opacity="0.8" />

      {/* Rear Wheels (Recessed) */}
      <ellipse cx="8" cy="58" rx="5" ry="7" fill="#0d0d0d" />
      <ellipse cx="36" cy="58" rx="5" ry="7" fill="#0d0d0d" />
      
      {/* Front Wheels (Recessed) */}
      <ellipse cx="8" cy="16" rx="5" ry="7" fill="#0d0d0d" />
      <ellipse cx="36" cy="16" rx="5" ry="7" fill="#0d0d0d" />

      {/* Main Body - Realistic Supercar Proportions */}
      <path 
        d="M10 68 
           C8 68, 7 65, 8 58
           L9 48
           C9 45, 10 42, 11 40
           L13 30
           C14 25, 15 20, 17 15
           L19 8
           C20 5, 22 3, 22 3
           C22 3, 24 5, 25 8
           L27 15
           C29 20, 30 25, 31 30
           L33 40
           C34 42, 35 45, 35 48
           L36 58
           C37 65, 36 68, 34 68
           Z" 
        fill="url(#cyberPaint)" 
        stroke={glowColor}
        strokeWidth="0.8"
      />

      {/* Side Neon Strips */}
      <path d="M12 55 L14 30" stroke={glowColor} strokeWidth="2" opacity="0.9" filter="url(#glowBlur)" />
      <path d="M32 55 L30 30" stroke={glowColor} strokeWidth="2" opacity="0.9" filter="url(#glowBlur)" />

      {/* Front LED Light Bar */}
      <rect x="14" y="5" width="16" height="3" rx="1" fill={glowColor} filter="url(#glowBlur)" />
      <rect x="15" y="5.5" width="14" height="2" rx="0.5" fill="#ffffff" opacity="0.6" />

      {/* Vertical LED Accents */}
      <rect x="17" y="4" width="2" height="5" fill={glowColor} />
      <rect x="25" y="4" width="2" height="5" fill={glowColor} />

      {/* Windshield with Reflection */}
      <path 
        d="M15 22 
           C15 18, 18 14, 22 14
           C26 14, 29 18, 29 22
           L28 32
           C28 35, 25 37, 22 37
           C19 37, 16 35, 16 32
           Z" 
        fill="url(#windowReflect)" 
        stroke={glowColor}
        strokeWidth="0.8"
        opacity="0.95"
      />
      
      {/* Window Reflection Lines */}
      <path d="M18 18 L20 28" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />
      <path d="M24 16 L25 26" stroke="#ffffff" strokeWidth="0.5" opacity="0.3" />

      {/* Roof Panel Lines */}
      <path d="M18 37 L20 50" stroke="#444444" strokeWidth="0.5" />
      <path d="M26 37 L24 50" stroke="#444444" strokeWidth="0.5" />

      {/* Side Mirrors */}
      <ellipse cx="10" cy="28" rx="2" ry="1.5" fill="#222222" stroke={glowColor} strokeWidth="0.5" />
      <ellipse cx="34" cy="28" rx="2" ry="1.5" fill="#222222" stroke={glowColor} strokeWidth="0.5" />

      {/* Rear Light Strip */}
      <rect x="12" y="66" width="20" height="2" rx="1" fill="#ff0000" opacity="0.8" />

      {/* Wheel Rims - Open Design */}
      <circle cx="8" cy="58" r="3" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.6" />
      <circle cx="36" cy="58" r="3" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.6" />
      <circle cx="8" cy="16" r="3" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.6" />
      <circle cx="36" cy="16" r="3" fill="none" stroke={glowColor} strokeWidth="1" opacity="0.6" />

      {/* Hover Rings */}
      <ellipse cx="22" cy="71" rx="12" ry="1.5" fill="none" stroke={glowColor} strokeWidth="0.5" opacity="0.4" />
      
      {/* Aero Details */}
      <path d="M10 52 L34 52" stroke="#333333" strokeWidth="0.5" />
      <path d="M11 46 L33 46" stroke="#333333" strokeWidth="0.5" />
    </svg>
  );
}

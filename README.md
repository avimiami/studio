# Velocity Chaser

Ariel's Car Chaser Game - A fast-paced racing game built with Next.js and Firebase.

## Game Overview

Control your Bugatti race car around the track while avoiding Chevy pace cars that give chase! Select your favorite car color and compete for the highest score.

### Features

- **Car Selection**: Choose from 4 vibrant car colors (blue, yellow, pink, red)
- **Race Track**: Navigate around a dynamic race track while avoiding chase cars
- **Score Display**: Real-time score tracking during gameplay
- **Leaderboard**: Compete with other players and climb the rankings
- **Smooth Animations**: Enjoy fluid car movements and transitions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Backend**: Firebase (Firestore for leaderboard)
- **AI Integration**: Genkit

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd studio
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase (optional - for leaderboard functionality):
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Copy your Firebase config to `src/lib/firebase.ts`
   - Deploy Firestore security rules: `firebase deploy --only firestore`

### Running the Game

Start the development server:
```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack on port 9002
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with file watching

## How to Play

1. Visit the home page and select your car color
2. Click "Start Race" to begin
3. Use arrow keys to control your Bugatti car
4. Avoid the Chevy chase cars
5. Survive as long as possible to get the highest score!

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── page.tsx      # Home/car selection page
│   └── race/         # Game page
├── components/       # React components
│   ├── RaceTrack.tsx # Main game component
│   ├── CarSelector.tsx
│   └── ui/           # shadcn/ui components
├── lib/              # Utility functions and types
└── ai/               # Genkit AI integration
```

## Design

- **Primary Color**: Vibrant blue (#29ABE2)
- **Background**: Light gray (#E9ECEF)
- **Accent**: Bright orange (#FF8C00)
- **Fonts**: Space Grotesk (headlines), Inter (body)

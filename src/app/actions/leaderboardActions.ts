
'use server';

import { db } from '@/lib/firebase';
import type { LeaderboardEntry } from '@/lib/types';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp, type Timestamp } from 'firebase/firestore';

console.log('leaderboardActions.ts module loaded. db object:', db);

const LEADERBOARD_COLLECTION = 'leaderboard';
const LEADERBOARD_LIMIT = 10;

export async function getLeaderboardScores(): Promise<LeaderboardEntry[]> {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      orderBy('score', 'desc'),
      orderBy('timestamp', 'asc'), // Tie-breaker: older scores rank higher
      limit(LEADERBOARD_LIMIT)
    );
    const querySnapshot = await getDocs(q);
    const scores: LeaderboardEntry[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      scores.push({ 
        id: doc.id, 
        name: data.name,
        score: data.score,
        timestamp: data.timestamp as Timestamp // Ensure timestamp is correctly typed
      } as LeaderboardEntry);
    });
    return scores;
  } catch (error) {
    console.error("Error fetching leaderboard scores: ", error);
    throw new Error('Failed to fetch leaderboard scores.');
  }
}

interface AddLeaderboardScoreInput {
  name: string;
  score: number;
}

export async function addLeaderboardScore(input: AddLeaderboardScoreInput): Promise<{ success: boolean; id?: string; error?: string }> {
  console.log('addLeaderboardScore called with input:', input);
  if (!input.name || input.name.trim().length === 0) {
    console.log('Validation failed: Name is empty.');
    return { success: false, error: 'Name cannot be empty.' };
  }
  if (input.score <= 0) { // Scores must be positive, adjust if 0 is a valid score
    console.log('Validation failed: Score is not greater than 0.');
     return { success: false, error: 'Score must be greater than 0.'};
  }

  try {
    console.log('Attempting to add document to Firestore collection:', LEADERBOARD_COLLECTION);
    const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      name: input.name.trim(),
      score: input.score,
      timestamp: serverTimestamp(),
    });
    console.log('Successfully added document with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding leaderboard score: ", error);
    return { success: false, error: 'Failed to add score to leaderboard.' };
  }
}

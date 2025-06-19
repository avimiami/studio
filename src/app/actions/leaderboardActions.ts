'use server';

import { db } from '@/lib/firebase';
import type { LeaderboardEntry } from '@/lib/types';
import { collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

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
      scores.push({ id: doc.id, ...doc.data() } as LeaderboardEntry);
    });
    return scores;
  } catch (error) {
    console.error("Error fetching leaderboard scores: ", error);
    // In a real app, you might want to throw a custom error or return a specific error object
    throw new Error('Failed to fetch leaderboard scores.');
  }
}

interface AddLeaderboardScoreInput {
  name: string;
  score: number;
}

export async function addLeaderboardScore(input: AddLeaderboardScoreInput): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!input.name || input.name.trim().length === 0) {
    return { success: false, error: 'Name cannot be empty.' };
  }
  if (input.score <= 0) {
     return { success: false, error: 'Score must be greater than 0.'};
  }

  try {
    const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      name: input.name.trim(),
      score: input.score,
      timestamp: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding leaderboard score: ", error);
    return { success: false, error: 'Failed to add score to leaderboard.' };
  }
}

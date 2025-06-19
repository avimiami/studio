
"use client";

import type { LeaderboardEntry } from "@/lib/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface LeaderboardDisplayProps {
  entries: LeaderboardEntry[];
}

export function LeaderboardDisplay({ entries }: LeaderboardDisplayProps) {
  if (!entries || entries.length === 0) {
    return (
      <Card className="w-full max-w-md mt-4 shadow-lg bg-background/90">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center text-primary flex items-center justify-center">
            <Trophy className="mr-2 h-7 w-7 text-yellow-400" />
            Top Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The leaderboard is currently empty. Be the first to set a high score!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mt-4 shadow-lg bg-background/90">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center text-primary flex items-center justify-center">
          <Trophy className="mr-2 h-7 w-7 text-yellow-400" />
          Top Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] text-center">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={entry.id || index}>
                <TableCell className="font-medium text-center">{index + 1}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell className="text-right">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

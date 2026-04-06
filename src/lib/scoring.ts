import {
  MAX_POINTS,
  MIN_POINTS,
  STREAK_BONUSES,
  MAX_STREAK_BONUS,
  GRACE_PERIOD_MS,
  VOTE_PARTICIPATION_POINTS,
  VOTE_MAJORITY_POINTS,
} from './constants';
import type { ChaosType } from './types';

export function calculateBasePoints(
  responseTimeMs: number,
  timeLimitMs: number,
): number {
  // Grace period: answers within 500ms after timer get floor points
  if (responseTimeMs > timeLimitMs + GRACE_PERIOD_MS) return 0;
  if (responseTimeMs > timeLimitMs) return MIN_POINTS;

  const speedFraction = Math.max(0, 1 - responseTimeMs / timeLimitMs);
  return Math.round(MAX_POINTS * (0.5 + 0.5 * speedFraction));
}

export function calculateStreakBonus(streak: number): number {
  if (streak < 2) return 0;
  if (streak >= 5) return MAX_STREAK_BONUS;
  return STREAK_BONUSES[streak] ?? 0;
}

export function calculateTotalPoints(
  basePoints: number,
  streak: number,
  chaos?: ChaosType,
  isSabotaged?: boolean,
): number {
  let total = basePoints + calculateStreakBonus(streak);

  if (chaos === 'double-points') {
    total *= 2;
  }

  if (isSabotaged) {
    total = Math.floor(total * 0.5);
  }

  return total;
}

export function calculateReversePoints(
  correct: boolean,
  responseTimeMs: number,
  timeLimitMs: number,
): number {
  // In reverse mode: wrong = points, correct = 0
  if (correct) return 0;
  return calculateBasePoints(responseTimeMs, timeLimitMs);
}

export function calculateSliderPoints(
  answer: number,
  correctValue: number,
  min: number,
  max: number,
): number {
  const range = max - min;
  if (range === 0) return MAX_POINTS;
  const accuracy = 1 - Math.abs(answer - correctValue) / range;
  return Math.round(MAX_POINTS * Math.max(0, accuracy));
}

export function calculateVotePoints(
  votedForMajority: boolean,
): number {
  return VOTE_PARTICIPATION_POINTS + (votedForMajority ? VOTE_MAJORITY_POINTS : 0);
}

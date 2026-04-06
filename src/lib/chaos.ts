import { CHAOS_CONFIGS } from './constants';
import type { ChaosConfig, ChaosType } from './types';

export function getChaosConfig(type: ChaosType): ChaosConfig {
  return CHAOS_CONFIGS[type];
}

export function getEffectiveTimeLimit(
  baseTimeLimit: number,
  chaos?: ChaosType,
): number {
  if (!chaos) return baseTimeLimit;
  const config = CHAOS_CONFIGS[chaos];
  return config?.modifyTimer ?? baseTimeLimit;
}

export function isScoreInverted(chaos?: ChaosType): boolean {
  return chaos === 'reverse-scoring';
}

export function isBlindRound(chaos?: ChaosType): boolean {
  return chaos === 'blind-round';
}

export function hasSabotagePhase(chaos?: ChaosType): boolean {
  return chaos === 'sabotage-vote';
}

import type { ChaosConfig } from './types';

// Game settings
export const MAX_PLAYERS = 40;
export const MIN_PLAYERS = 2;
export const PIN_LENGTH = 6;
export const DEFAULT_TIME_LIMIT = 20; // seconds
export const GRACE_PERIOD_MS = 500; // accept answers 500ms after timer
export const GET_READY_DURATION = 3000; // ms to show "get ready" screen

// Scoring
export const MAX_POINTS = 1000;
export const MIN_POINTS = 500; // floor for correct answer at timer end
export const STREAK_BONUSES: Record<number, number> = {
  2: 100,
  3: 200,
  4: 300,
};
export const MAX_STREAK_BONUS = 500; // streak 5+
export const VOTE_PARTICIPATION_POINTS = 200;
export const VOTE_MAJORITY_POINTS = 500;

// Answer button colors (Kahoot-inspired but neon)
export const ANSWER_COLORS = [
  { bg: '#FF4655', name: 'red', shape: 'triangle' },
  { bg: '#3B82F6', name: 'blue', shape: 'diamond' },
  { bg: '#FFD60A', name: 'yellow', shape: 'circle' },
  { bg: '#34D399', name: 'green', shape: 'square' },
] as const;

// Chaos mechanic configs
export const CHAOS_CONFIGS: Record<string, ChaosConfig> = {
  'double-points': {
    type: 'double-points',
    displayName: 'DOUBLE POINTS',
    description: '2x aura points this round fr fr 💰',
    emoji: '💰',
    scoreMultiplier: 2,
  },
  'sabotage-vote': {
    type: 'sabotage-vote',
    displayName: 'SABOTAGE',
    description: 'Vote to absolutely DESTROY someones score no cap 🔪',
    emoji: '🔪',
  },
  'speed-demon': {
    type: 'speed-demon',
    displayName: 'SPEED DEMON',
    description: '5 seconds. Thats it bestie. Speedrun this. ⚡',
    emoji: '⚡',
    modifyTimer: 5,
  },
  'blind-round': {
    type: 'blind-round',
    displayName: 'BLIND ROUND',
    description: 'Options vanish after 3 seconds... good luck 💀',
    emoji: '🙈',
  },
  'reverse-scoring': {
    type: 'reverse-scoring',
    displayName: 'REVERSE',
    description: 'Wrong = W. Right = L. Ohio moment. 🔄',
    emoji: '🔄',
  },
};

// Timing
export const LEADERBOARD_TOP_N = 5;
export const PODIUM_TOP_N = 3;
export const BLIND_ROUND_VISIBLE_MS = 3000;
export const FLASH_GIF_VISIBLE_MS = 3000;

// Audio phases
export const AUDIO_TRACKS = {
  lobby: '/audio/lobby.mp3',
  question: '/audio/question.mp3',
  'reveal-correct': '/audio/reveal-correct.mp3',
  'reveal-wrong': '/audio/reveal-wrong.mp3',
  leaderboard: '/audio/leaderboard.mp3',
  podium: '/audio/podium.mp3',
  'chaos-activate': '/audio/chaos-activate.mp3',
} as const;

// Brainrot nickname suggestions
export const NICKNAME_SUGGESTIONS = [
  'TralaleroTralala', 'BombardiroCroc', 'AuraFarmer', 'RizzGod', 'ChillGuy', 'MogMachine', 'DeluxeDelulu', 'GyattMaster', 'SigmaGrindset', 'NPC_Energy', 'GlazingKing', 'MewingPro', 'LooksMaxxed', 'BrainAFK', 'OhioVibes', 'FanumTaxer', 'GoatedFr', 'MainCharacter', 'TouchGrass', 'CopiumDealer', 'SussyBaka', 'EdgeLord420', 'BasedDetector', 'VibeCurator', 'SkibidiKing', 'AuraMaxxer', 'NoCapFr', 'LRatioW'
];

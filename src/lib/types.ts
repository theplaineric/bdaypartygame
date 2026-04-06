// ---- Question Types ----

export type QuestionVariant =
  | 'classic-gif-quiz'
  | 'flash-gif'
  | 'zoom-enhance'
  | 'reverse-gif'
  | 'ai-or-real'
  | 'finish-the-meme'
  | 'name-that-brainrot'
  | 'who-said-this'
  | 'friend-trivia'
  | 'whos-most-likely'
  | 'would-they-rather'
  | 'hot-take-meter'
  | 'brainrot-fill-blank'
  | 'sus-or-real'
  | 'emoji-decode'
  | 'how-viral';

export type AnswerMode =
  | 'multiple-choice'
  | 'binary'
  | 'vote'
  | 'slider';

export type ChaosType =
  | 'double-points'
  | 'sabotage-vote'
  | 'speed-demon'
  | 'blind-round'
  | 'reverse-scoring';

export type GamePhase =
  | 'lobby'
  | 'get-ready'
  | 'question'
  | 'answering'
  | 'reveal'
  | 'leaderboard'
  | 'sabotage-vote'
  | 'podium';

// ---- Questions ----

export interface BaseQuestion {
  id: string;
  variant: QuestionVariant;
  answerMode: AnswerMode;
  prompt: string;
  timeLimit: number;
  points: number;
  chaos?: ChaosType;
  mediaUrl?: string;
  mediaType?: 'gif' | 'image' | 'video' | 'audio';
  audioUrl?: string; // background audio to play during the question
  audioStartAt?: number; // start audio at this many seconds in (for beat drop timing)
  revealAudio?: string[]; // audio files to play staggered on reveal
  revealDelayGif?: string; // GIF to show before revealing answer
  revealDelayMs?: number; // how long to show the delay GIF
  revealDelaySounds?: { src: string; delayMs: number; startAt?: number }[]; // sounds to play during delay at specific times
  optionImages?: string[]; // image URLs for each option (shown instead of text)
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  answerMode: 'multiple-choice';
  options: [string, string, string, string];
  correctIndex: number;
  multiSelect?: boolean; // allow selecting multiple answers
  correctIndices?: number[]; // for multi-select questions
}

export interface BinaryQuestion extends BaseQuestion {
  answerMode: 'binary';
  options: [string, string];
  correctIndex: number;
}

export interface VoteQuestion extends BaseQuestion {
  answerMode: 'vote';
  options: string[];
  // No correct answer — tallied by votes
}

export interface SliderQuestion extends BaseQuestion {
  answerMode: 'slider';
  min: number;
  max: number;
  correctValue: number;
  unit?: string;
}

export type Question =
  | MultipleChoiceQuestion
  | BinaryQuestion
  | VoteQuestion
  | SliderQuestion;

// ---- Chaos ----

export interface ChaosConfig {
  type: ChaosType;
  displayName: string;
  description: string;
  emoji: string;
  modifyTimer?: number;
  scoreMultiplier?: number;
}

// ---- Players ----

export interface Player {
  id: string;
  nickname: string;
  score: number;
  streak: number;
  connected: boolean;
}

export interface PlayerAnswer {
  questionId: string;
  answer: string | number;
  timestamp: number;
  correct?: boolean;
  pointsEarned: number;
}

// ---- Game State ----

export interface LeaderboardEntry {
  playerId: string;
  nickname: string;
  score: number;
  rank: number;
  streak: number;
  rankChange?: number;
}

export interface RevealData {
  correctAnswer: string | number;
  answerDistribution: Record<string, number>;
  fastestCorrect?: string;
  totalAnswered: number;
  totalPlayers: number;
}

export interface ClientQuestion {
  id: string;
  variant: QuestionVariant;
  answerMode: AnswerMode;
  prompt: string;
  timeLimit: number;
  options?: string[];
  optionImages?: string[];
  mediaUrl?: string;
  mediaType?: 'gif' | 'image' | 'video' | 'audio';
  min?: number;
  max?: number;
  unit?: string;
  chaos?: ChaosType;
  multiSelect?: boolean;
  audioUrl?: string;
  audioStartAt?: number;
  revealAudio?: string[];
  revealDelayGif?: string;
  revealDelayMs?: number;
  revealDelaySounds?: { src: string; delayMs: number; startAt?: number }[];
}

export interface ClientGameState {
  pin: string;
  phase: GamePhase;
  players: Player[];
  hostConnected: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion?: ClientQuestion;
  activeChaos?: ChaosType;
  timeRemaining?: number;
  questionStartTime?: number;
  revealData?: RevealData;
  leaderboard: LeaderboardEntry[];
  answeredCount?: number;
  sabotageResultNickname?: string;
  lastPlayerResult?: { correct: boolean; points: number; streak: number; rank: number; totalPlayers: number };
}

// ---- WebSocket Messages ----

// Server -> All Clients
export type ServerMessage =
  | { type: 'lobby:update'; players: Player[] }
  | { type: 'game:start'; totalQuestions: number }
  | { type: 'get-ready'; questionIndex: number; totalQuestions: number; chaos?: ChaosType }
  | { type: 'question:show'; question: ClientQuestion }
  | { type: 'question:start'; startTime: number; timeLimit: number }
  | { type: 'answer:count'; count: number; total: number }
  | { type: 'reveal:show'; data: RevealData }
  | { type: 'leaderboard:show'; entries: LeaderboardEntry[] }
  | { type: 'podium:show'; top3: LeaderboardEntry[] }
  | { type: 'chaos:activate'; chaos: ChaosConfig }
  | { type: 'sabotage:start'; players: Pick<Player, 'id' | 'nickname'>[] }
  | { type: 'sabotage:result'; targetNickname: string }
  | { type: 'server:full-state'; state: ClientGameState };

// Server -> Individual Player
export type PlayerMessage =
  | { type: 'player:joined'; playerId: string; nickname: string }
  | { type: 'player:rejected'; reason: string }
  | { type: 'player:result'; correct: boolean; points: number; streak: number; rank: number; totalPlayers: number };

// Client -> Server
export type ClientMessage =
  | { type: 'host:create' }
  | { type: 'player:join'; nickname: string; pin: string }
  | { type: 'client:rejoin'; role: 'host' | 'player'; playerId?: string }
  | { type: 'host:start-game' }
  | { type: 'host:next' }
  | { type: 'host:show-reveal' }
  | { type: 'host:show-leaderboard' }
  | { type: 'host:show-podium' }
  | { type: 'host:restart' }
  | { type: 'player:answer'; questionId: string; answer: string | number }
  | { type: 'sabotage:vote'; targetId: string };

// ---- Variant → Renderer Mapping ----

export const VARIANT_ANSWER_MODE: Record<QuestionVariant, AnswerMode> = {
  'classic-gif-quiz': 'multiple-choice',
  'flash-gif': 'multiple-choice',
  'zoom-enhance': 'multiple-choice',
  'reverse-gif': 'multiple-choice',
  'ai-or-real': 'binary',
  'finish-the-meme': 'multiple-choice',
  'name-that-brainrot': 'multiple-choice',
  'who-said-this': 'multiple-choice',
  'friend-trivia': 'multiple-choice',
  'whos-most-likely': 'vote',
  'would-they-rather': 'binary',
  'hot-take-meter': 'binary',
  'brainrot-fill-blank': 'multiple-choice',
  'sus-or-real': 'binary',
  'emoji-decode': 'multiple-choice',
  'how-viral': 'slider',
};

export type HostRendererType = 'media' | 'timed-reveal' | 'vote' | 'range';

export const VARIANT_RENDERER: Record<QuestionVariant, HostRendererType> = {
  'classic-gif-quiz': 'media',
  'flash-gif': 'timed-reveal',
  'zoom-enhance': 'media',
  'reverse-gif': 'media',
  'ai-or-real': 'media',
  'finish-the-meme': 'timed-reveal',
  'name-that-brainrot': 'timed-reveal',
  'who-said-this': 'timed-reveal',
  'friend-trivia': 'media',
  'whos-most-likely': 'vote',
  'would-they-rather': 'vote',
  'hot-take-meter': 'vote',
  'brainrot-fill-blank': 'timed-reveal',
  'sus-or-real': 'media',
  'emoji-decode': 'timed-reveal',
  'how-viral': 'range',
};

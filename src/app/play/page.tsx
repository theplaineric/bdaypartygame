'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ANSWER_COLORS, BLIND_ROUND_VISIBLE_MS } from '@/lib/constants';
import { questions } from '@/lib/questions';
import {
  calculateBasePoints,
  calculateReversePoints,
  calculateSliderPoints,
  calculateTotalPoints,
  calculateVotePoints,
} from '@/lib/scoring';
import { getEffectiveTimeLimit } from '@/lib/chaos';
import type { Question } from '@/lib/types';
import { useScreenWakeLock } from '@/hooks/useScreenWakeLock';

const STATIC_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/+$/, '') ?? '';

type QuizPhase = 'intro' | 'question' | 'reveal' | 'complete';

interface QuestionResult {
  questionId: string;
  prompt: string;
  correct: boolean;
  scoreDelta: number;
  nextStreak: number;
  timedOut: boolean;
  answerLabel: string;
  correctLabel: string;
}

function withBasePath(src?: string) {
  if (!src) return undefined;
  if (!src.startsWith('/') || !STATIC_BASE_PATH) return src;
  return `${STATIC_BASE_PATH}${src}`;
}

function getCorrectLabel(question: Question) {
  if (question.answerMode === 'vote') return 'Opinion round. No wrong answer.';
  if (question.answerMode === 'slider') return `${question.correctValue}${question.unit ? ` ${question.unit}` : ''}`;

  if ('correctIndices' in question && question.correctIndices?.length) {
    return question.correctIndices.map((index) => question.options[index]).join(', ');
  }

  return question.options[question.correctIndex] ?? '';
}

function describeAnswer(question: Question, answer: string | number | number[] | null) {
  if (answer === null) return 'No answer';

  if (question.answerMode === 'slider') {
    return `${answer}${question.unit ? ` ${question.unit}` : ''}`;
  }

  if (Array.isArray(answer)) {
    return answer.map((index) => question.options[index]).join(', ');
  }

  if (typeof answer === 'number') {
    return question.options[answer] ?? String(answer);
  }

  return String(answer);
}

function evaluateQuestion(
  question: Question,
  answer: string | number | number[] | null,
  elapsedMs: number,
  streak: number,
): QuestionResult {
  const timeLimitMs = getEffectiveTimeLimit(question.timeLimit, question.chaos) * 1000;
  const answerLabel = describeAnswer(question, answer);
  const correctLabel = getCorrectLabel(question);

  if (answer === null) {
    return {
      questionId: question.id,
      prompt: question.prompt,
      correct: false,
      scoreDelta: 0,
      nextStreak: 0,
      timedOut: true,
      answerLabel,
      correctLabel,
    };
  }

  if (question.answerMode === 'vote') {
    return {
      questionId: question.id,
      prompt: question.prompt,
      correct: true,
      scoreDelta: calculateVotePoints(false),
      nextStreak: streak,
      timedOut: false,
      answerLabel,
      correctLabel,
    };
  }

  if (question.answerMode === 'slider') {
    const numericAnswer = Number(answer);
    const scoreDelta = calculateSliderPoints(
      numericAnswer,
      question.correctValue,
      question.min,
      question.max,
    );
    const range = question.max - question.min;
    const correct = Math.abs(numericAnswer - question.correctValue) <= range * 0.1;

    return {
      questionId: question.id,
      prompt: question.prompt,
      correct,
      scoreDelta,
      nextStreak: correct ? streak + 1 : 0,
      timedOut: false,
      answerLabel,
      correctLabel,
    };
  }

  if ('correctIndices' in question && question.correctIndices?.length && Array.isArray(answer)) {
    const selected = answer;
    const expected = question.correctIndices;
    const correctCount = selected.filter((value) => expected.includes(value)).length;
    const wrongCount = selected.filter((value) => !expected.includes(value)).length;
    const ratio = Math.max(0, correctCount - wrongCount) / expected.length;
    const correct = ratio > 0;
    const base = correct ? Math.round(calculateBasePoints(elapsedMs, timeLimitMs) * ratio) : 0;
    const scoreDelta = correct
      ? calculateTotalPoints(base, streak + 1, question.chaos, false)
      : 0;

    return {
      questionId: question.id,
      prompt: question.prompt,
      correct,
      scoreDelta,
      nextStreak: correct ? streak + 1 : 0,
      timedOut: false,
      answerLabel,
      correctLabel,
    };
  }

  const numericAnswer = Number(answer);
  const correct = numericAnswer === question.correctIndex;
  const scoreDelta = question.chaos === 'reverse-scoring'
    ? calculateReversePoints(correct, elapsedMs, timeLimitMs)
    : correct
      ? calculateTotalPoints(
          calculateBasePoints(elapsedMs, timeLimitMs),
          streak + 1,
          question.chaos,
          false,
        )
      : 0;
  const nextStreak = question.chaos === 'reverse-scoring'
    ? (correct ? 0 : streak + 1)
    : (correct ? streak + 1 : 0);

  return {
    questionId: question.id,
    prompt: question.prompt,
    correct: question.chaos === 'reverse-scoring' ? !correct : correct,
    scoreDelta,
    nextStreak,
    timedOut: false,
    answerLabel,
    correctLabel,
  };
}

function QuestionMedia({ question }: { question: Question }) {
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const mediaUrl = withBasePath(question.mediaUrl);
  const audioUrl = withBasePath(question.audioUrl);

  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    if (question.audioStartAt) audio.currentTime = question.audioStartAt;
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(() => {});
    bgAudioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
      bgAudioRef.current = null;
    };
  }, [audioUrl, question.audioStartAt, question.id]);

  if (!mediaUrl && !audioUrl) return null;

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4">
      {question.mediaType === 'image' || question.mediaType === 'gif' ? (
        <img
          src={mediaUrl}
          alt=""
          className="max-h-[32vh] w-full rounded-2xl object-contain"
        />
      ) : null}
      {question.mediaType === 'video' ? (
        <video
          key={mediaUrl}
          src={mediaUrl}
          controls
          playsInline
          className="max-h-[32vh] w-full rounded-2xl"
        />
      ) : null}
      {question.mediaType === 'audio' ? (
        <audio
          key={mediaUrl}
          src={mediaUrl}
          controls
          className="w-full"
        />
      ) : null}
      {audioUrl ? (
        <p className="mt-3 text-sm text-zinc-400">
          Background audio is playing for this round.
        </p>
      ) : null}
    </div>
  );
}

export default function PlayPage() {
  useScreenWakeLock();

  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionStartedAt, setQuestionStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [lastResult, setLastResult] = useState<QuestionResult | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);

  const question = questions[currentIndex];
  const effectiveTimeLimit = useMemo(
    () => getEffectiveTimeLimit(question.timeLimit, question.chaos),
    [question],
  );
  const remainingMs = questionStartedAt
    ? Math.max(0, (effectiveTimeLimit * 1000) - (now - questionStartedAt))
    : effectiveTimeLimit * 1000;
  const blindHidden = question.chaos === 'blind-round'
    && questionStartedAt !== null
    && (now - questionStartedAt) >= BLIND_ROUND_VISIBLE_MS;

  useEffect(() => {
    if (phase !== 'question') return;

    const interval = setInterval(() => {
      setNow(Date.now());
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  const startQuiz = useCallback(() => {
    setScore(0);
    setStreak(0);
    setResults([]);
    setLastResult(null);
    setCurrentIndex(0);
    setSelectedMulti([]);
    const initialQuestion = questions[0];
    setSliderValue(
      initialQuestion.answerMode === 'slider'
        ? Math.round((initialQuestion.min + initialQuestion.max) / 2)
        : 50,
    );
    setNow(Date.now());
    setQuestionStartedAt(Date.now());
    setPhase('question');
  }, []);

  const showNextQuestion = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= questions.length) {
      setPhase('complete');
      setQuestionStartedAt(null);
      return;
    }

    const nextQuestion = questions[nextIndex];
    setCurrentIndex(nextIndex);
    setSelectedMulti([]);
    setSliderValue(
      nextQuestion.answerMode === 'slider'
        ? Math.round((nextQuestion.min + nextQuestion.max) / 2)
        : 50,
    );
    setLastResult(null);
    setNow(Date.now());
    setQuestionStartedAt(Date.now());
    setPhase('question');
  }, [currentIndex]);

  const submitAnswer = useCallback((answer: string | number | number[] | null) => {
    if (phase !== 'question' || !questionStartedAt) return;

    const result = evaluateQuestion(
      question,
      answer,
      Date.now() - questionStartedAt,
      streak,
    );

    setScore((current) => current + result.scoreDelta);
    setStreak(result.nextStreak);
    setLastResult(result);
    setResults((current) => [...current, result]);
    setQuestionStartedAt(null);
    setPhase('reveal');
  }, [phase, question, questionStartedAt, streak]);

  useEffect(() => {
    if (phase !== 'question' || !questionStartedAt) return;

    const timeout = setTimeout(() => {
      submitAnswer(null);
    }, effectiveTimeLimit * 1000);

    return () => clearTimeout(timeout);
  }, [effectiveTimeLimit, phase, questionStartedAt, submitAnswer]);

  const correctCount = results.filter((result) => result.correct).length;

  if (phase === 'intro') {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-6xl font-black tracking-tight text-white">BRAINROT KAHOOT</h1>
        <p className="mt-4 max-w-2xl text-xl text-zinc-300">
          Static single-device edition. Play the full quiz on one screen, keep score locally,
          and export it anywhere that can host static files.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 px-8 py-6">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Question Count</p>
          <p className="mt-2 text-5xl font-black text-neon-pink">{questions.length}</p>
        </div>
        <button
          onClick={startQuiz}
          className="mt-10 rounded-2xl bg-neon-pink px-10 py-5 text-xl font-black text-white transition-transform hover:scale-105 active:scale-95"
        >
          PLAY QUIZ
        </button>
      </main>
    );
  }

  if (phase === 'complete') {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-4xl flex-col items-center justify-center px-6 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Final Score</p>
        <h1 className="mt-2 text-7xl font-black text-neon-green">{score.toLocaleString()}</h1>
        <p className="mt-4 text-xl text-zinc-300">
          {correctCount} / {questions.length} rounds cleared
        </p>
        <button
          onClick={startQuiz}
          className="mt-10 rounded-2xl bg-neon-blue px-10 py-5 text-xl font-black text-black transition-transform hover:scale-105 active:scale-95"
        >
          PLAY AGAIN
        </button>
      </main>
    );
  }

  if (phase === 'reveal' && lastResult) {
    return (
      <main className="mx-auto flex min-h-full w-full max-w-4xl flex-col justify-center px-6 py-10">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <h1 className="mt-4 text-4xl font-black text-white">
          {lastResult.timedOut ? 'Too Slow' : lastResult.correct ? 'W Rizz' : 'Emotional Damage'}
        </h1>
        <p className="mt-4 text-6xl font-black text-neon-green">+{lastResult.scoreDelta}</p>
        <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-6 text-left">
          <p><span className="text-zinc-500">Your answer:</span> {lastResult.answerLabel}</p>
          <p><span className="text-zinc-500">Expected:</span> {lastResult.correctLabel}</p>
          <p><span className="text-zinc-500">Streak:</span> {lastResult.nextStreak}</p>
          <p><span className="text-zinc-500">Total score:</span> {score.toLocaleString()}</p>
        </div>
        <button
          onClick={showNextQuestion}
          className="mt-8 self-start rounded-2xl bg-neon-yellow px-8 py-4 text-lg font-black text-black transition-transform hover:scale-105 active:scale-95"
        >
          {currentIndex + 1 === questions.length ? 'SEE RESULTS' : 'NEXT QUESTION'}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-full w-full max-w-5xl flex-col px-6 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="mt-2 text-2xl font-black text-white">{question.prompt}</p>
        </div>
        <div className="text-right">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Score</p>
          <p className="text-3xl font-black text-neon-green">{score.toLocaleString()}</p>
        </div>
      </div>

      <div className="mb-6 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${(remainingMs / (effectiveTimeLimit * 1000)) * 100}%`,
            backgroundColor: remainingMs <= 5000 ? '#FF4655' : '#34D399',
          }}
        />
      </div>

      <div className="mb-6 flex items-center gap-3 text-sm text-zinc-400">
        <span>{Math.ceil(remainingMs / 1000)}s left</span>
        {question.chaos ? (
          <span className="rounded-full border border-neon-pink/60 bg-neon-pink/10 px-3 py-1 font-bold text-neon-pink">
            {question.chaos}
          </span>
        ) : null}
      </div>

      <QuestionMedia question={question} />

      <div className="mt-8 grid flex-1 gap-4 md:grid-cols-2">
        {question.answerMode !== 'slider' ? question.options.map((option, index) => {
          const isSelected = selectedMulti.includes(index);
          return (
            <button
              key={`${question.id}-${index}`}
              onClick={() => {
                if ('correctIndices' in question && question.correctIndices?.length) {
                  setSelectedMulti((current) => (
                    current.includes(index)
                      ? current.filter((value) => value !== index)
                      : [...current, index]
                  ));
                  return;
                }

                submitAnswer(index);
              }}
              className={`rounded-3xl p-5 text-left text-lg font-bold text-white transition-transform hover:scale-[1.01] active:scale-[0.99] ${
                'correctIndices' in question && question.correctIndices?.length && isSelected
                  ? 'ring-4 ring-white'
                  : ''
              }`}
              style={{ backgroundColor: ANSWER_COLORS[index % ANSWER_COLORS.length].bg }}
            >
              {question.optionImages?.[index] && !blindHidden ? (
                <img
                  src={withBasePath(question.optionImages[index])}
                  alt={option}
                  className="mb-4 h-28 w-full rounded-2xl object-cover"
                />
              ) : null}
              <span>{blindHidden ? '???' : option}</span>
            </button>
          );
        }) : (
          <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6">
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={sliderValue}
              onChange={(event) => setSliderValue(Number(event.target.value))}
              className="w-full accent-neon-pink"
            />
            <p className="mt-4 text-xl font-black text-white">
              {sliderValue}{question.unit ? ` ${question.unit}` : ''}
            </p>
            <button
              onClick={() => submitAnswer(sliderValue)}
              className="mt-6 rounded-2xl bg-neon-pink px-8 py-4 text-lg font-black text-white transition-transform hover:scale-105 active:scale-95"
            >
              LOCK IN
            </button>
          </div>
        )}
      </div>

      {'correctIndices' in question && question.correctIndices?.length ? (
        <button
          onClick={() => submitAnswer(selectedMulti)}
          disabled={selectedMulti.length === 0}
          className="mt-6 self-start rounded-2xl bg-neon-pink px-8 py-4 text-lg font-black text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          LOCK IN ({selectedMulti.length})
        </button>
      ) : null}
    </main>
  );
}

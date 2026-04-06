'use client';

export default function PlayError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black text-white p-8">
      <div className="text-6xl mb-4">💀</div>
      <h2 className="text-2xl font-black mb-2">nah this is COOKED 💀</h2>
      <p className="text-zinc-400 mb-6 text-center">{error.message}</p>
      <button
        onClick={reset}
        className="px-8 py-4 bg-neon-pink rounded-xl font-bold text-xl hover:scale-105 transition-transform"
      >
        run it back
      </button>
    </div>
  );
}

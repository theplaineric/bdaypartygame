import Link from 'next/link';

export default function HostPage() {
  return (
    <main className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Static Edition</p>
      <h1 className="mt-4 text-5xl font-black text-white">Host Mode Retired</h1>
      <p className="mt-4 text-xl text-zinc-300">
        The party version used a live multiplayer backend. This public version is now a
        single-device static quiz.
      </p>
      <Link
        href="/play"
        className="mt-10 rounded-2xl bg-neon-pink px-10 py-5 text-xl font-black text-white transition-transform hover:scale-105 active:scale-95"
      >
        OPEN THE QUIZ
      </Link>
    </main>
  );
}

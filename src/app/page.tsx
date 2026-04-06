import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-black px-6">
      <div className="text-center mb-12 animate-fadeIn">
        <h1 className="text-6xl font-black tracking-tighter mb-2 animate-neonGlow">
          THE
        </h1>
        <h2 className="text-4xl font-black text-neon-pink tracking-wider">
          BRAINROT KAHOOT
        </h2>
        <p className="text-zinc-500 mt-4 text-lg">a chaotic static quiz you can play on any single device 💀🔥</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/play"
          className="flex items-center justify-center h-16 rounded-2xl bg-neon-pink text-white font-black text-xl tracking-wide transition-transform hover:scale-105 active:scale-95"
        >
          PLAY QUIZ
        </Link>
        <Link
          href="/host"
          className="flex items-center justify-center h-16 rounded-2xl bg-neon-blue text-black font-black text-xl tracking-wide transition-transform hover:scale-105 active:scale-95"
        >
          STATIC INFO
        </Link>
      </div>

      <p className="text-zinc-700 text-sm mt-12">🧠 brainrot level: MAXIMUM OVERDRIVE 🧠</p>
    </div>
  );
}

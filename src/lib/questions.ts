import type { Question } from './types';

// Brainrot Kahoot — public quiz set
export const questions: Question[] = [
  {
    id: 'q1',
    variant: 'would-they-rather',
    answerMode: 'vote',
    prompt: 'Your hb (45teen) is lowkirkenuinely being brutally looksmogged by foids. Do you…?',
    timeLimit: 25,
    points: 1000,
    options: [
      'Abandon being nonchalant and byyourselfmaxxing and genuinely slime them out',
      'Start streaming to your giftok community (24 followers btw) and brutally sell them out to Mechanyahu',
      'Lowkey sacrifice one of them to resurrect King Von from Hell',
      'Genuinely deglove them in a salvia fent schizo meltdown on some spiritual jawn type shit',
    ],
    mediaUrl: 'https://media1.tenor.com/m/cA0mmNYlrC4AAAAC/elephant-in-the-room-address-me-elephant.gif',
    mediaType: 'gif',
    revealDelayGif: 'https://media.giphy.com/media/8mOPhOrOj8QHfdYdz9/giphy.gif',
    revealDelayMs: 2000,
  },

  // ---- Q2: Instagram Reel — Who Is This? ----
  {
    id: 'q2',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'In this reel... WHO IS THIS? 👀',
    timeLimit: 20,
    points: 1000,
    revealAudio: ['/audio/anime-wow.mp3', '/audio/fahhhh-long.mp3'],
    // Drop the reel video as public/videos/reel-q2.mp4 and uncomment:
    mediaUrl: '/videos/reel-q2.mp4',
    mediaType: 'video',
    options: ['Triple T', 'Tralalero Tralala', 'Tripi Tropi', 'Your manager'] as [string, string, string, string],
    correctIndex: 0, // Triple T
  },

  // ---- Q3: What Is The Song Name? ----
  {
    id: 'q3',
    variant: 'name-that-brainrot',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS THE SONG NAME? 🎵👀',
    timeLimit: 20,
    points: 1000,
    mediaUrl: '/audio/q3-song.mp3',
    mediaType: 'audio',
    optionImages: [
      'https://media1.tenor.com/m/ipEummcmlJEAAAAC/everybody-hates-chris-everybody-hates-chris-meme.gif',
      'https://media1.tenor.com/m/cluXgQj6HdcAAAAC/dance-getdown.gif',
    ],
    options: [
      'صدام يابو عداي',
      'حبيبي يا نور العين',
      'صباح الخير يا وطني',
      'عيني يا عيني عليك',
    ] as [string, string, string, string],
    correctIndex: 0,
  },

  // ---- Q4: Best Zootopia Character ----
  {
    id: 'q4',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHO IS THE BEST CHARACTER IN ZOOTOPIA? 🐰🦊',
    timeLimit: 20,
    points: 1000,
    audioUrl: '/audio/q4-zootopia.mp3',
    options: ['Judy Hopps', 'Nick Wilde', 'Flash', 'Chief Bogo'] as [string, string, string, string],
    optionImages: [
      '/images/zootopia/judy.gif',
      '/images/zootopia/nick.gif',
      '/images/zootopia/flash.gif',
      '/images/zootopia/bogo.gif',
    ],
    correctIndex: 0, // Judy Hopps
  },

  // ---- Q5: Fill In The Blank — Japan Footsteps ----
  {
    id: 'q5',
    variant: 'brainrot-fill-blank',
    answerMode: 'multiple-choice',
    prompt: '🇯🇵 Japan is turning footsteps into electricity! Using piezoelectric tiles, every step you take generates a small amount of energy. _______ of steps together can power LED lights and displays in busy places like Shibuya Station.',
    timeLimit: 20,
    points: 1000,
    revealAudio: ['/audio/surprised.mp3', '/audio/fahhhh-long.mp3'],
    options: ['Thousands', 'Millions', 'Hundreds', 'Billions'] as [string, string, string, string],
    correctIndex: 1, // Millions
  },

  // ---- Q6: What Is Happening In This Photo? (Multi-Select) ----
  {
    id: 'q6',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS HAPPENING IN THIS PHOTO? (select multiple) 👀',
    timeLimit: 20,
    points: 1000,
    mediaUrl: '/images/q6-klaus.png',
    mediaType: 'image',
    audioUrl: '/audio/q6-klaus.mp3',
    multiSelect: true,
    correctIndices: [0, 1, 2], // everything except Friendship,
    options: [
      'Absolute framemogging',
      'Cortisol levels spiking',
      '2 chuds hanging out',
      'Friendship',
    ] as [string, string, string, string],
    correctIndex: 0, // fallback, actual check uses correctIndices
  },

  // ---- Q7: Kim Jong Un Master Of? ----
  {
    id: 'q7',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS KIM JONG UN THE MASTER OF? 🇰🇵',
    timeLimit: 15,
    points: 1000,
    audioUrl: '/audio/q7-kimjongun.mp3',
    mediaUrl: 'https://media1.tenor.com/m/IZqylGLe1PwAAAAC/angry-bird-angry-bird-red.gif',
    mediaType: 'gif',
    options: ['GOON', 'NUKES', 'AURA', 'RIZZ'] as [string, string, string, string],
    correctIndex: 0, // GOON
    revealDelayGif: 'https://media1.tenor.com/m/PC6Mv4FtNMkAAAAC/he-made-a-statement-so-bad.gif',
    revealDelayMs: 3000,
    revealDelaySounds: [
      { src: '/audio/vine-boom.mp3', delayMs: 0 },
      { src: '/audio/oh-hell-nah.mp3', delayMs: 1000 },
    ],
  },

  // ---- Q8: One Of These Is Not Like The Other ----
  {
    id: 'q8',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'ONE OF THESE GIFS IS NOT LIKE THE OTHER... WHICH ONE? 👀',
    timeLimit: 20,
    points: 1000,
    options: ['GIF 1', 'GIF 2', 'GIF 3', 'GIF 4'] as [string, string, string, string],
    optionImages: [
      'https://media.giphy.com/media/L36EE2yCn2XHHftQg5/giphy.gif',
      'https://media.giphy.com/media/xtwyefP9CfKL9urbEV/giphy.gif',
      'https://media.giphy.com/media/Bg0mdxmTVzjWZHtGat/giphy.gif',
      'https://media1.tenor.com/m/yoLRw2BDHqoAAAAC/please.gif',
    ],
    correctIndex: 1, // the 2nd GIF
    revealAudio: [
      '/audio/fahhhh-long.mp3',
      '/audio/vine-boom.mp3',
      '/audio/among-us-reveal.mp3',
    ],
    revealDelaySounds: [
      { src: '/audio/q8-gifguess.mp3', delayMs: 0, startAt: 45 },
    ],
    revealDelayMs: 4000,
  },

  // ---- Q9: How Do You Enter Agartha? ----
  {
    id: 'q9',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'HOW DO YOU ENTER AGARTHA? 🏔️🌀',
    timeLimit: 20,
    points: 1000,
    mediaUrl: '/images/q9-agartha.png',
    mediaType: 'image',
    audioUrl: '/audio/q9-agartha.mp3',
    audioStartAt: 25, // beat drops at 45s, timer is 20s, so start at 25s
    revealDelayGif: 'https://media.giphy.com/media/IWwCyRpngqLlN4E1uH/giphy.gif',
    revealDelayMs: 2000,
    options: [
      'Drink a white Monster Energy',
      'Take the UFOs at Area 51',
      'Visit the land down under',
      'Climb the corporate ladder',
    ] as [string, string, string, string],
    correctIndex: 0, // UPDATE if different — which is correct?
  },

  // ---- Q10: What Happened To Netanyahu? ----
  {
    id: 'q10',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHAT HAPPENED TO NETANYAHU? 🤔',
    timeLimit: 20,
    points: 1000,
    mediaUrl: '/images/q10-mechanyahu.png',
    mediaType: 'image',
    audioUrl: '/audio/q10-netanyahu.mp3',
    revealDelayGif: 'https://media.giphy.com/media/Pk3ljzIDb4R0j3zpMU/giphy.gif',
    revealDelayMs: 3000,
    options: [
      "He's alive",
      "He's dead",
      'He escaped to Argentina',
      "He's reincarnated using ancient Babylonian technology into Mechanyahu",
    ] as [string, string, string, string],
    correctIndex: 3, // Mechanyahu
  },

  // ============================================
  // 🔥 CHAOS ROUND — BRAINROT KNOWLEDGE 🔥
  // ============================================

  // ---- Q11: Tralalero Tralala (SABOTAGE VOTE) ----
  {
    id: 'q11',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'In Italian Brainrot, WHAT IS TRALALERO TRALALA? 🇮🇹🦈',
    timeLimit: 15,
    points: 1000,
    chaos: 'sabotage-vote',
    options: [
      'A dolphin wearing Adidas slides',
      'A shark wearing Nike shoes',
      'A tuna fish in a suit',
      'A whale with sunglasses',
    ] as [string, string, string, string],
    correctIndex: 1,
    revealAudio: ['/audio/vine-boom.mp3'],
  },

  // ---- Q12: Bombardiro Crocodilo (SPEED DEMON) ----
  {
    id: 'q12',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS BOMBARDIRO CROCODILO? 🐊💣',
    timeLimit: 20,
    points: 1000,
    chaos: 'speed-demon',
    options: [
      'A crocodile wearing army boots',
      'A military tank with a crocodile tail',
      'A bomber plane with a crocodile face',
      'A crocodile riding a fighter jet',
    ] as [string, string, string, string],
    correctIndex: 2,
    revealAudio: ['/audio/social-credit.mp3', '/audio/metal-pipe.mp3', '/audio/go-crazy.mp3'],
  },

  // ---- Q13: Skibidi Toilet Creator ----
  {
    id: 'q13',
    variant: 'friend-trivia',
    answerMode: 'multiple-choice',
    prompt: 'WHO CREATED THE SKIBIDI TOILET SERIES? 🚽🗿',
    timeLimit: 15,
    chaos: 'double-points',
    points: 1000,
    options: [
      'MrBeast',
      'Alexey Gerasimov (DaFuq!?Boom!)',
      'PewDiePie',
      'Dream',
    ] as [string, string, string, string],
    correctIndex: 1,
    revealAudio: ['/audio/roblox-oof.mp3', '/audio/oh-hell-nah.mp3', '/audio/fahhhh-long.mp3'],
  },

  // ---- Q14: What Is Mewing (DOUBLE POINTS) ----
  {
    id: 'q14',
    variant: 'brainrot-fill-blank',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS "MEWING"? 🗿',
    timeLimit: 15,
    points: 1000,
    chaos: 'double-points',
    options: [
      'Making cat sounds on TikTok',
      'A vocal fry technique from ASMR creators',
      'A tongue posture technique to reshape the jawline',
      'A breathing exercise from gym culture',
    ] as [string, string, string, string],
    correctIndex: 2,
    revealAudio: ['/audio/emotional-damage.mp3', '/audio/sigma-boy.mp3'],
  },

  // ---- Q15: Who Coined Rizz ----
  {
    id: 'q15',
    variant: 'friend-trivia',
    answerMode: 'multiple-choice',
    prompt: 'WHO POPULARIZED THE WORD "RIZZ"? ✨',
    timeLimit: 15,
    chaos: 'speed-demon',
    points: 1000,
    options: [
      'Drake',
      'KSI',
      'Kai Cenat',
      'Tyler the Creator',
    ] as [string, string, string, string],
    correctIndex: 2,
    revealAudio: ['/audio/rizz.mp3', '/audio/siuuu.mp3'],
  },

  // ---- Q16: Fanum Tax ----
  {
    id: 'q16',
    variant: 'brainrot-fill-blank',
    answerMode: 'multiple-choice',
    prompt: 'WHAT IS THE "FANUM TAX"? 🍔💰',
    timeLimit: 15,
    points: 1000,
    chaos: 'blind-round',
    options: [
      'A penalty for losing a gaming bet',
      'When Fanum steals bites of other people\'s food',
      'A donation fee during AMP streams',
      'Fanum\'s signature dance move',
    ] as [string, string, string, string],
    correctIndex: 1,
    revealAudio: ['/audio/doi-doi.mp3', '/audio/taco-bell.mp3', '/audio/goofy-horn.mp3'],
    revealDelayGif: 'https://media1.tenor.com/m/WvYJnr85GLoAAAAC/claude-claude-code.gif',
    revealDelayMs: 3000,
    revealDelaySounds: [
      { src: '/audio/oh-hell-nah.mp3', delayMs: 0 },
      { src: '/audio/vine-boom.mp3', delayMs: 0 },
      { src: '/audio/tuco-get-out.mp3', delayMs: 2500 },
    ],
  },

  // ---- Q17: Chill Guy (BLIND ROUND) ----
  {
    id: 'q17',
    variant: 'classic-gif-quiz',
    answerMode: 'multiple-choice',
    prompt: 'WHAT DOES THE "CHILL GUY" MEME DEPICT? 😎',
    timeLimit: 15,
    points: 1000,
    chaos: 'blind-round',
    options: [
      'A cat in a bathrobe holding coffee',
      'A bear in a hoodie with arms crossed',
      'A brown dog in a grey sweater and Converse',
      'A frog sitting in an armchair',
    ] as [string, string, string, string],
    correctIndex: 2,
    revealAudio: ['/audio/fortnite-chest.mp3', '/audio/gta-passed.mp3', '/audio/fahhhh-long.mp3'],
  },

  // ---- Q18: Mogging (REVERSE SCORING) ----
  {
    id: 'q18',
    variant: 'brainrot-fill-blank',
    answerMode: 'multiple-choice',
    prompt: 'WHAT DOES IT MEAN TO "MOG" SOMEONE? 💪🗿',
    timeLimit: 15,
    points: 1000,
    chaos: 'reverse-scoring',
    options: [
      'To prank someone during a livestream',
      'To visibly outclass someone in looks or presence',
      'To copy someone\'s outfit or style',
      'To challenge someone to a fight online',
    ] as [string, string, string, string],
    correctIndex: 1,
    revealAudio: ['/audio/sus.mp3', '/audio/vine-boom.mp3', '/audio/mission-failed.mp3'],
  },

];

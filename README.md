# Brainrot Kahoot

Chaotic static quiz built with Next.js.

## Getting Started

```bash
pnpm install
```

Run local dev:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000/play
```

## Static Export

This repo is configured for `next build` static export.

```bash
pnpm build
```

The exported site will be written to `out/`.

## GitHub Pages

For a project Pages site such as `https://<user>.github.io/<repo>/`, build with a base path:

```bash
NEXT_PUBLIC_BASE_PATH=/bdaypartygame pnpm build
```

If you use a custom domain or a user site at the root, leave `NEXT_PUBLIC_BASE_PATH` unset.

This repo also includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys the static export to GitHub Pages on pushes to `main`.

## Customizing The Quiz

- Edit `src/lib/questions.ts` to swap in your own questions, media, and audio.
- The playable quiz lives at `/play`.
- The old multiplayer host route now just points people to the static quiz.

## Notes

- Questions, scoring, and game flow are all local client state now.
- This version is suitable for static hosting, including GitHub Pages.

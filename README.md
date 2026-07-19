# Docket — Notes

A modern note-taking app. Colored sticky-note cards, instant search, favorites, and dark mode. Built with Next.js 16, React 19, shadcn/ui (base-mira), and Tailwind v4.

## Features

- **Create / edit / delete** notes in a dialog editor
- **8 pastel colors** per note, pickable inline
- **Star** favorites — they sort to the top
- **Search** across title and content, live
- **Dark mode** toggle, persisted
- **Local persistence** — notes and theme survive refresh (no backend)

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Does                    |
| ---------------- | ----------------------- |
| `bun dev`        | Dev server              |
| `bun run build`  | Production build        |
| `bun start`      | Serve the build         |
| `bun test`       | Run unit tests          |
| `bun run lint`   | ESLint                  |

## Architecture

Client-side only. State lives in React; storage is the browser's `localStorage`.

```
app/
  page.tsx              Notes page — composition only, no storage logic
  layout.tsx            Root layout, fonts, metadata
lib/
  notes.ts             Note model, colors, filterNotes (search+sort), storage, seed
  notes.test.ts        Unit tests for filterNotes
  utils.ts             cn()
hooks/
  use-notes.ts         Notes CRUD + auto-persist (single source of truth)
  use-theme.ts         Persisted dark-mode toggle
components/
  note-card.tsx        Grid tile
  note-editor.tsx      Add/edit dialog
  ui/                  shadcn/ui primitives
```

### Storage

Two `localStorage` keys:

- `docket.notes.v1` — array of notes as JSON
- `docket.theme` — `"dark"` | `"light"`

Per-browser, not synced across devices. To swap in a real backend, replace `loadNotes`/`saveNotes` in `lib/notes.ts` and the persistence calls in `hooks/use-notes.ts` — the UI is untouched.

## Data model

```ts
type Note = {
  id: string
  title: string
  content: string
  color: NoteColor   // amber | coral | lime | violet | green | sky | rose | slate
  starred: boolean
  updatedAt: number
}
```

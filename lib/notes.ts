export type NoteColor =
  | "amber"
  | "coral"
  | "lime"
  | "violet"
  | "green"
  | "sky"
  | "rose"
  | "slate"

export type Note = {
  id: string
  title: string
  content: string
  color: NoteColor
  starred: boolean
  updatedAt: number
}

// bg / text tuned for readable dark text on pastel, in light + dark mode.
export const NOTE_COLORS: Record<NoteColor, { bg: string; ring: string; label: string }> = {
  amber: { bg: "bg-amber-300", ring: "ring-amber-400", label: "Amber" },
  coral: { bg: "bg-orange-400", ring: "ring-orange-500", label: "Coral" },
  lime: { bg: "bg-lime-300", ring: "ring-lime-400", label: "Lime" },
  violet: { bg: "bg-violet-400", ring: "ring-violet-500", label: "Violet" },
  green: { bg: "bg-green-300", ring: "ring-green-400", label: "Green" },
  sky: { bg: "bg-sky-400", ring: "ring-sky-500", label: "Sky" },
  rose: { bg: "bg-rose-300", ring: "ring-rose-400", label: "Rose" },
  slate: { bg: "bg-slate-300", ring: "ring-slate-400", label: "Slate" },
}

export const COLOR_KEYS = Object.keys(NOTE_COLORS) as NoteColor[]

// Search by title/content, then starred-first, newest-first. Pure — testable.
export function filterNotes(notes: Note[], query: string): Note[] {
  const q = query.trim().toLowerCase()
  return notes
    .filter(
      (n) =>
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
    )
    .sort(
      (a, b) =>
        Number(b.starred) - Number(a.starred) || b.updatedAt - a.updatedAt
    )
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const KEY = "docket.notes.v1"

export function loadNotes(): Note[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as Note[]
  } catch {
    // ignore corrupt storage
  }
  return SEED
}

export function saveNotes(notes: Note[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(notes))
  } catch {
    // storage full / unavailable — non-fatal
  }
}

export function newNote(): Note {
  return {
    id: crypto.randomUUID(),
    title: "",
    content: "",
    color: COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)],
    starred: false,
    updatedAt: Date.now(),
  }
}

const day = 86_400_000
const SEED: Note[] = [
  {
    id: "seed-1",
    title: "The beginning of screenless design: UI jobs to be taken over by Solution Architect",
    content: "Voice and gesture interfaces shift the designer's role from pixels to systems.",
    color: "amber",
    starred: false,
    updatedAt: Date.now() - day * 2,
  },
  {
    id: "seed-2",
    title: "13 Things You Should Give Up If You Want To Be a Successful UX Designer",
    content: "Perfectionism, the HiPPO, and designing for yourself top the list.",
    color: "coral",
    starred: true,
    updatedAt: Date.now() - day * 5,
  },
  {
    id: "seed-3",
    title: "The Psychology Principles Every UI/UX Designer Needs to Know",
    content: "Hick's Law, Fitts's Law, and the Von Restorff effect in practice.",
    color: "lime",
    starred: false,
    updatedAt: Date.now() - day * 9,
  },
  {
    id: "seed-4",
    title: "10 UI & UX Lessons from Designing My Own Product",
    content: "Ship the ugly version first. Talk to users before the third iteration.",
    color: "violet",
    starred: true,
    updatedAt: Date.now() - day * 12,
  },
  {
    id: "seed-5",
    title: "52 Research Terms you need to know as a UX Designer",
    content: "From affinity diagramming to think-aloud protocol.",
    color: "green",
    starred: false,
    updatedAt: Date.now() - day * 16,
  },
  {
    id: "seed-6",
    title: "Text fields & Forms design — UI components series",
    content: "Label placement, inline validation, and the case against placeholders.",
    color: "sky",
    starred: false,
    updatedAt: Date.now() - day * 20,
  },
]

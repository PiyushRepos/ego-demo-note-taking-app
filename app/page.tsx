"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  Search01Icon,
  Sun03Icon,
  Moon02Icon,
  StickyNote01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NoteCard } from "@/components/note-card"
import { NoteEditor } from "@/components/note-editor"
import { useNotes } from "@/hooks/use-notes"
import { useTheme } from "@/hooks/use-theme"
import { filterNotes, newNote, type Note } from "@/lib/notes"

export default function Home() {
  const { notes, upsert, remove, toggleStar } = useNotes()
  const { dark, toggle } = useTheme()
  const [query, setQuery] = React.useState("")
  const [editing, setEditing] = React.useState<Note | null>(null)

  const save = (note: Note) => {
    upsert(note)
    setEditing(null)
  }

  const del = (id: string) => {
    remove(id)
    setEditing(null)
  }

  const visible = filterNotes(notes, query)

  return (
    <div className="flex min-h-full flex-1 bg-[#e8e9f3] dark:bg-black">
      <div className="flex w-full flex-1 flex-col overflow-hidden bg-background shadow-sm">
        {/* Top bar */}
        <header className="flex items-center gap-4 border-b border-border px-5 py-4 sm:px-8">
          <span className="text-lg font-bold tracking-tight">Docket</span>
          <div className="relative ml-2 max-w-md flex-1">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="h-9 rounded-full border-transparent bg-muted pl-9 text-sm"
            />
          </div>
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Toggle theme"
            onClick={toggle}
            className="ml-auto rounded-full"
          >
            <HugeiconsIcon icon={dark ? Sun03Icon : Moon02Icon} size={18} strokeWidth={2} />
          </Button>
        </header>

        {/* Body */}
        <div className="flex flex-1 gap-6 overflow-y-auto px-5 py-8 sm:gap-10 sm:px-8">
          {/* Left rail */}
          <div className="sticky top-0 shrink-0">
            <Button
              size="icon-lg"
              aria-label="New note"
              onClick={() => setEditing(newNote())}
              className="size-11 rounded-full shadow-md"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={20} strokeWidth={2.5} />
            </Button>
          </div>

          {/* Main column */}
          <main className="min-w-0 flex-1">
            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl">
              Notes
            </h1>

            {visible.length === 0 ? (
              <EmptyState hasNotes={notes.length > 0} onNew={() => setEditing(newNote())} />
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onOpen={() => setEditing(note)}
                    onToggleStar={() => toggleStar(note.id)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <NoteEditor
        note={editing}
        onOpenChange={(open) => !open && setEditing(null)}
        onSave={save}
        onDelete={del}
      />
    </div>
  )
}

function EmptyState({
  hasNotes,
  onNew,
}: {
  hasNotes: boolean
  onNew: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border py-24 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
        <HugeiconsIcon icon={StickyNote01Icon} size={26} strokeWidth={2} />
      </div>
      <p className="text-sm text-muted-foreground">
        {hasNotes ? "No notes match your search." : "No notes yet."}
      </p>
      {!hasNotes && (
        <Button onClick={onNew} className="gap-1.5">
          <HugeiconsIcon icon={PlusSignIcon} size={15} strokeWidth={2.5} />
          Create your first note
        </Button>
      )}
    </div>
  )
}

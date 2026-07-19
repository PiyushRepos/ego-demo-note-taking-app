"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Edit02Icon, StarIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { formatDate, NOTE_COLORS, type Note } from "@/lib/notes"

export function NoteCard({
  note,
  onOpen,
  onToggleStar,
}: {
  note: Note
  onOpen: () => void
  onToggleStar: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onOpen()
        }
      }}
      className={cn(
        "group relative flex aspect-square cursor-pointer flex-col justify-between rounded-2xl p-5 text-left text-neutral-900 shadow-sm transition-all duration-200 outline-none hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        NOTE_COLORS[note.color].bg
      )}
    >
      <Button
        size="icon"
        aria-label={note.starred ? "Remove star" : "Add star"}
        onClick={(e) => {
          e.stopPropagation()
          onToggleStar()
        }}
        className={cn(
          "absolute top-4 right-4 rounded-full",
          note.starred
            ? "bg-neutral-900 text-amber-300 hover:bg-neutral-900"
            : "bg-transparent text-neutral-900/40 opacity-0 hover:bg-black/10 hover:text-neutral-900 group-hover:opacity-100"
        )}
      >
        <HugeiconsIcon icon={StarIcon} size={15} strokeWidth={2} />
      </Button>

      <p className="mt-1 line-clamp-5 pr-6 text-lg leading-snug font-medium">
        {note.title || "Untitled note"}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-neutral-900/60">
          {formatDate(note.updatedAt)}
        </span>
        <Button
          size="icon-lg"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none rounded-full bg-neutral-900 text-white group-hover:scale-105 group-hover:bg-neutral-900"
        >
          <HugeiconsIcon icon={Edit02Icon} size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
  )
}

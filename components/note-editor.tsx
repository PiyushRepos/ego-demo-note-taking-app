"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon, StarIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog"
import { COLOR_KEYS, NOTE_COLORS, type Note } from "@/lib/notes"

export function NoteEditor({
  note,
  onOpenChange,
  onSave,
  onDelete,
}: {
  note: Note | null
  onOpenChange: (open: boolean) => void
  onSave: (note: Note) => void
  onDelete: (id: string) => void
}) {
  const [draft, setDraft] = React.useState<Note | null>(note)

  React.useEffect(() => setDraft(note), [note])

  if (!draft) return null

  const patch = (p: Partial<Note>) => setDraft({ ...draft, ...p })

  return (
    <Dialog open={note !== null} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("sm:max-w-lg", NOTE_COLORS[draft.color].bg, "text-neutral-900 ring-black/10")}
      >
        <div className="flex min-w-0 items-start gap-2 pr-10">
          <Input
            autoFocus
            value={draft.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="Note title"
            className="h-auto min-w-0 border-0 bg-transparent px-0 text-xl font-semibold text-neutral-900 placeholder:text-neutral-900/40 focus-visible:ring-0"
          />
          <Button
            size="icon"
            aria-label={draft.starred ? "Remove star" : "Add star"}
            onClick={() => patch({ starred: !draft.starred })}
            className={cn(
              "shrink-0 rounded-full",
              draft.starred
                ? "bg-neutral-900 text-amber-300 hover:bg-neutral-900"
                : "bg-black/5 text-neutral-900/50 hover:bg-black/10 hover:text-neutral-900"
            )}
          >
            <HugeiconsIcon icon={StarIcon} size={15} strokeWidth={2} />
          </Button>
        </div>

        <Textarea
          value={draft.content}
          onChange={(e) => patch({ content: e.target.value })}
          placeholder="Write something…"
          rows={6}
          className="resize-none border-0 bg-black/5 text-neutral-900 placeholder:text-neutral-900/40 focus-visible:ring-black/20"
        />

        <div className="flex items-center gap-1.5">
          {COLOR_KEYS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={NOTE_COLORS[c].label}
              onClick={() => patch({ color: c })}
              className={cn(
                "size-6 rounded-full ring-offset-2 ring-offset-transparent transition-transform hover:scale-110",
                NOTE_COLORS[c].bg,
                draft.color === c && "ring-2 ring-neutral-900"
              )}
            />
          ))}
        </div>

        <DialogFooter className="mt-2 flex-row items-center justify-between gap-2 sm:justify-between">
          <Button
            variant="ghost"
            onClick={() => onDelete(draft.id)}
            className="gap-1.5 bg-black/5 text-neutral-900 hover:bg-black/10"
          >
            <HugeiconsIcon icon={Delete02Icon} size={15} strokeWidth={2} />
            Delete
          </Button>
          <div className="flex gap-2">
            <DialogClose
              render={
                <Button variant="ghost" className="bg-black/5 text-neutral-900 hover:bg-black/10">
                  Cancel
                </Button>
              }
            />
            <Button
              onClick={() => onSave({ ...draft, updatedAt: Date.now() })}
              className="bg-neutral-900 text-white hover:bg-neutral-800"
            >
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import * as React from "react"

import { loadNotes, saveNotes, type Note } from "@/lib/notes"


export function useNotes() {
  const [notes, setNotes] = React.useState<Note[]>([])

  React.useEffect(() => setNotes(loadNotes()), [])

  const persist = React.useCallback((next: Note[]) => {
    setNotes(next)
    saveNotes(next)
  }, [])

  const upsert = React.useCallback(
    (note: Note) =>
      setNotes((prev) => {
        const next = prev.some((n) => n.id === note.id)
          ? prev.map((n) => (n.id === note.id ? note : n))
          : [note, ...prev]
        saveNotes(next)
        return next
      }),
    []
  )

  const remove = React.useCallback(
    (id: string) =>
      setNotes((prev) => {
        const next = prev.filter((n) => n.id !== id)
        saveNotes(next)
        return next
      }),
    []
  )

  const toggleStar = React.useCallback(
    (id: string) =>
      setNotes((prev) => {
        const next = prev.map((n) =>
          n.id === id ? { ...n, starred: !n.starred } : n
        )
        saveNotes(next)
        return next
      }),
    []
  )

  return { notes, upsert, remove, toggleStar, persist }
}
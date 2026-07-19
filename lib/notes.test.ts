import { expect, test } from "bun:test"

import { filterNotes, type Note } from "./notes"

const mk = (over: Partial<Note>): Note => ({
  id: "x",
  title: "",
  content: "",
  color: "amber",
  starred: false,
  updatedAt: 0,
  ...over,
})

test("starred first, then newest", () => {
  const notes = [
    mk({ id: "old", updatedAt: 1 }),
    mk({ id: "new", updatedAt: 3 }),
    mk({ id: "star", updatedAt: 2, starred: true }),
  ]
  expect(filterNotes(notes, "").map((n) => n.id)).toEqual(["star", "new", "old"])
})

test("search matches title or content, case-insensitive", () => {
  const notes = [
    mk({ id: "a", title: "Design systems" }),
    mk({ id: "b", content: "about DESIGN tokens" }),
    mk({ id: "c", title: "unrelated" }),
  ]
  expect(filterNotes(notes, "design").map((n) => n.id).sort()).toEqual(["a", "b"])
})

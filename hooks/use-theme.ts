"use client"

import * as React from "react"

const KEY = "docket.theme"

export function useTheme() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setDark(localStorage.getItem(KEY) === "dark")
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem(KEY, dark ? "dark" : "light")
  }, [dark])

  const toggle = React.useCallback(() => setDark((d) => !d), [])

  return { dark, toggle }
}

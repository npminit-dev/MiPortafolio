import { useRef } from "react"
import { createContext, useState, useEffect } from "react"

export const drawcontext = createContext()

export function DrawContextProvider({ children }) {

  const [drawOn, setDrawOn] = useState(false)
  const [isDownScrolled, setIsDownScrolled] = useState(true)
  const curr_prev = useRef([0, 0])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(!drawOn) setDrawOn(true)
      curr_prev.current = [curr_prev.current[1], Math.round(window.scrollY)]
      if(curr_prev.current[1] >= curr_prev.current[0]) setIsDownScrolled(true)
      else setIsDownScrolled(false)
    })
  }, [])

  return (
    <drawcontext.Provider
      value={{
        drawOn,
        isDownScrolled,
      }}
    >
      { children }
    </drawcontext.Provider>
  )
}
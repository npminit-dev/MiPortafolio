import { createContext, useState, useEffect } from "react";

export const globalContext = createContext({});

const useTheme = () => {
  const [ theme, setTheme ] = useState('light')
  const switchTheme = () => setTheme(theme => {
    if(theme === 'light') return 'dark'
    if(theme === 'dark') return 'light' 
    else throw new Error('Invalid theme')
  })
  return [theme, setTheme, switchTheme]
}

export default function ThemeContextProvider({ children }) {

  const [theme, setTheme, switchTheme] = useTheme();
  const [wWidth, setWWidth] = useState(globalThis.innerWidth)

  globalThis.onresize = () => setWWidth(globalThis.innerWidth)

  return <globalContext.Provider
    value={{
      theme,
      setTheme,
      switchTheme,
      wWidth
    }}>
    { children }
  </globalContext.Provider>
}



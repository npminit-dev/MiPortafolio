import { useState, useEffect, createContext } from 'react'

export const themeContext = createContext({})

const useTheme = () => {
  const [theme, setTheme] = useState('light')
  const switchTheme = () => theme === 'light' ? setTheme('dark') : setTheme('light')
  return [theme, switchTheme]
}

export function ThemeContextProvider({ children }) {

  const [theme, switchTheme] = useTheme()

  useEffect(() => {
    console.log('theme switched')
  }, [theme])

  return (
    <themeContext.Provider value={{
      theme,
      switchTheme
    }}>
      { children }
    </themeContext.Provider>
  )
}
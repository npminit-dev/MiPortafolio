import { createContext, useState } from "react";

export const themeContext = createContext({});

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

  return <themeContext.Provider
    value={{
      theme,
      setTheme,
      switchTheme
    }}>
    { children }
  </themeContext.Provider>
}


